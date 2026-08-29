const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

function request(url, options = {}, bodyData = null) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;

      const reqOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      };

      if (bodyData) {
        const payload = JSON.stringify(bodyData);
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.headers['Content-Length'] = Buffer.byteLength(payload);
      }

      const start = Date.now();
      const req = client.request(reqOptions, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          let parsed = null;
          try { parsed = JSON.parse(raw); } catch (e) { parsed = raw; }
          resolve({ status: res.statusCode, data: parsed, headers: res.headers, timeMs: Date.now() - start });
        });
      });

      req.on('error', err => resolve({ status: 0, error: err.message, timeMs: Date.now() - start }));
      if (bodyData) req.write(JSON.stringify(bodyData));
      req.end();
    } catch (err) {
      resolve({ status: 0, error: err.message, timeMs: 0 });
    }
  });
}

async function runThreeWayVerification() {
  const localBase = 'http://localhost:8080';
  const renderBase = 'https://kk-jewellers-backend.onrender.com';
  const vercelBase = 'https://kkjewellers.vercel.app';

  const envUsername = process.env.TEST_ADMIN_USERNAME;
  const envPassword = process.env.TEST_ADMIN_PASSWORD;

  const testMatrix = [];

  function validateSettings(res) {
    return res.status === 200 && res.data && res.data.businessName === 'KK JEWELLERS' && !!res.data.phone;
  }

  function validateNewArrivals(res) {
    return res.status === 200 && Array.isArray(res.data) && res.data.length > 0 && !!res.data[0].id && !!res.data[0].productCode;
  }

  function validateBridal(res) {
    return res.status === 200 && Array.isArray(res.data) && res.data.length > 0 && !!(res.data[0].collection && res.data[0].collection.slug === 'bridal-collection');
  }

  function validateGallery(res) {
    return res.status === 200 && Array.isArray(res.data) && res.data.length > 0 && !!res.data[0].imageUrl;
  }

  function validateProductDetail(res) {
    return res.status === 200 && res.data && res.data.productCode === 'KK-NK-001' && !!res.data.name;
  }

  function validateAuthLogin(res) {
    return res.status === 200 && res.data && typeof res.data.token === 'string' && res.data.token.length > 20;
  }

  console.log('\n========================================================================================');
  console.log('  🔍 DETAILED ENDPOINT LOGS ACROSS ALL 3 ENVIRONMENTS');
  console.log('========================================================================================\n');

  // 1. GET /api/settings
  const l1 = await request(`${localBase}/api/settings`);
  const r1 = await request(`${renderBase}/api/settings`);
  const v1 = await request(`${vercelBase}/api/settings`);
  console.log(`[1/6] GET /api/settings:`);
  console.log(`  - LOCAL  (${localBase}): Status ${l1.status} | Business: "${l1.data?.businessName}" | Phone: "${l1.data?.phone}" (${l1.timeMs}ms)`);
  console.log(`  - RENDER (${renderBase}): Status ${r1.status} | Business: "${r1.data?.businessName}" | Phone: "${r1.data?.phone}" (${r1.timeMs}ms)`);
  console.log(`  - VERCEL (${vercelBase}): Status ${v1.status} | Business: "${v1.data?.businessName}" | Phone: "${v1.data?.phone}" (${v1.timeMs}ms)`);
  testMatrix.push({
    test: 'GET /api/settings',
    local: validateSettings(l1) ? `PASS (${l1.timeMs}ms)` : `FAIL (HTTP ${l1.status})`,
    render: validateSettings(r1) ? `PASS (${r1.timeMs}ms)` : `FAIL (HTTP ${r1.status})`,
    vercel: validateSettings(v1) ? `PASS (${v1.timeMs}ms)` : `FAIL (HTTP ${v1.status})`,
    result: validateSettings(l1) && validateSettings(r1) && validateSettings(v1) ? 'PASS' : 'FAIL'
  });

  // 2. GET /api/products/new-arrivals
  const l2 = await request(`${localBase}/api/products/new-arrivals`);
  const r2 = await request(`${renderBase}/api/products/new-arrivals`);
  const v2 = await request(`${vercelBase}/api/products/new-arrivals`);
  console.log(`\n[2/6] GET /api/products/new-arrivals:`);
  console.log(`  - LOCAL  : Status ${l2.status} | Count: ${l2.data?.length} | Sample SKU: ${l2.data?.[0]?.productCode} (${l2.timeMs}ms)`);
  console.log(`  - RENDER : Status ${r2.status} | Count: ${r2.data?.length} | Sample SKU: ${r2.data?.[0]?.productCode} (${r2.timeMs}ms)`);
  console.log(`  - VERCEL : Status ${v2.status} | Count: ${v2.data?.length} | Sample SKU: ${v2.data?.[0]?.productCode} (${v2.timeMs}ms)`);
  testMatrix.push({
    test: 'GET /api/products/new-arrivals',
    local: validateNewArrivals(l2) ? `PASS (${l2.data?.length || 0} items)` : `FAIL (HTTP ${l2.status})`,
    render: validateNewArrivals(r2) ? `PASS (${r2.data?.length || 0} items)` : `FAIL (HTTP ${r2.status})`,
    vercel: validateNewArrivals(v2) ? `PASS (${v2.data?.length || 0} items)` : `FAIL (HTTP ${v2.status})`,
    result: validateNewArrivals(l2) && validateNewArrivals(r2) && validateNewArrivals(v2) ? 'PASS' : 'FAIL'
  });

  // 3. GET /api/products?collection=bridal-collection
  const l3 = await request(`${localBase}/api/products?collection=bridal-collection`);
  const r3 = await request(`${renderBase}/api/products?collection=bridal-collection`);
  const v3 = await request(`${vercelBase}/api/products?collection=bridal-collection`);
  console.log(`\n[3/6] GET /api/products?collection=bridal-collection:`);
  console.log(`  - LOCAL  : Status ${l3.status} | Count: ${l3.data?.length} | Collection: "${l3.data?.[0]?.collection?.name}" (${l3.timeMs}ms)`);
  console.log(`  - RENDER : Status ${r3.status} | Count: ${r3.data?.length} | Collection: "${r3.data?.[0]?.collection?.name}" (${r3.timeMs}ms)`);
  console.log(`  - VERCEL : Status ${v3.status} | Count: ${v3.data?.length} | Collection: "${v3.data?.[0]?.collection?.name}" (${v3.timeMs}ms)`);
  testMatrix.push({
    test: 'GET /api/products?collection=bridal-collection',
    local: validateBridal(l3) ? `PASS (${l3.data?.length || 0} items)` : `FAIL (HTTP ${l3.status})`,
    render: validateBridal(r3) ? `PASS (${r3.data?.length || 0} items)` : `FAIL (HTTP ${r3.status})`,
    vercel: validateBridal(v3) ? `PASS (${v3.data?.length || 0} items)` : `FAIL (HTTP ${v3.status})`,
    result: validateBridal(l3) && validateBridal(r3) && validateBridal(v3) ? 'PASS' : 'FAIL'
  });

  // 4. GET /api/gallery
  const l4 = await request(`${localBase}/api/gallery`);
  const r4 = await request(`${renderBase}/api/gallery`);
  const v4 = await request(`${vercelBase}/api/gallery`);
  console.log(`\n[4/6] GET /api/gallery:`);
  console.log(`  - LOCAL  : Status ${l4.status} | Count: ${l4.data?.length} | Sample Title: "${l4.data?.[0]?.title}" (${l4.timeMs}ms)`);
  console.log(`  - RENDER : Status ${r4.status} | Count: ${r4.data?.length} | Sample Title: "${r4.data?.[0]?.title}" (${r4.timeMs}ms)`);
  console.log(`  - VERCEL : Status ${v4.status} | Count: ${v4.data?.length} | Sample Title: "${v4.data?.[0]?.title}" (${v4.timeMs}ms)`);
  testMatrix.push({
    test: 'GET /api/gallery',
    local: validateGallery(l4) ? `PASS (${l4.data?.length || 0} photos)` : `FAIL (HTTP ${l4.status})`,
    render: validateGallery(r4) ? `PASS (${r4.data?.length || 0} photos)` : `FAIL (HTTP ${r4.status})`,
    vercel: validateGallery(v4) ? `PASS (${v4.data?.length || 0} photos)` : `FAIL (HTTP ${v4.status})`,
    result: validateGallery(l4) && validateGallery(r4) && validateGallery(v4) ? 'PASS' : 'FAIL'
  });

  // 5. GET /api/products/code/KK-NK-001
  const l5 = await request(`${localBase}/api/products/code/KK-NK-001`);
  const r5 = await request(`${renderBase}/api/products/code/KK-NK-001`);
  const v5 = await request(`${vercelBase}/api/products/code/KK-NK-001`);
  console.log(`\n[5/6] GET /api/products/code/KK-NK-001:`);
  console.log(`  - LOCAL  : Status ${l5.status} | Code: "${l5.data?.productCode}" | Name: "${l5.data?.name}" (${l5.timeMs}ms)`);
  console.log(`  - RENDER : Status ${r5.status} | Code: "${r5.data?.productCode}" | Name: "${r5.data?.name}" (${r5.timeMs}ms)`);
  console.log(`  - VERCEL : Status ${v5.status} | Code: "${v5.data?.productCode}" | Name: "${v5.data?.name}" (${v5.timeMs}ms)`);
  testMatrix.push({
    test: 'GET /api/products/code/KK-NK-001',
    local: validateProductDetail(l5) ? `PASS (${l5.timeMs}ms)` : `FAIL (HTTP ${l5.status})`,
    render: validateProductDetail(r5) ? `PASS (${r5.timeMs}ms)` : `FAIL (HTTP ${r5.status})`,
    vercel: validateProductDetail(v5) ? `PASS (${v5.timeMs}ms)` : `FAIL (HTTP ${v5.status})`,
    result: validateProductDetail(l5) && validateProductDetail(r5) && validateProductDetail(v5) ? 'PASS' : 'FAIL'
  });

  // 6. POST /api/admin/auth/login
  let l6Pass = false, r6Pass = false, v6Pass = false;
  if (envUsername && envPassword) {
    const l6 = await request(`${localBase}/api/admin/auth/login`, { method: 'POST' }, { username: envUsername, password: envPassword });
    const r6 = await request(`${renderBase}/api/admin/auth/login`, { method: 'POST' }, { username: envUsername, password: envPassword });
    const v6 = await request(`${vercelBase}/api/admin/auth/login`, { method: 'POST' }, { username: envUsername, password: envPassword });
    l6Pass = validateAuthLogin(l6);
    r6Pass = validateAuthLogin(r6);
    v6Pass = validateAuthLogin(v6);
    console.log(`\n[6/6] POST /api/admin/auth/login (Auth Check):`);
    console.log(`  - LOCAL  : Status ${l6.status} | Token length: ${l6.data?.token?.length} chars (${l6.timeMs}ms)`);
    console.log(`  - RENDER : Status ${r6.status} | Token length: ${r6.data?.token?.length} chars (${r6.timeMs}ms)`);
    console.log(`  - VERCEL : Status ${v6.status} | Token length: ${v6.data?.token?.length} chars (${v6.timeMs}ms)`);
  } else {
    const l6Route = await request(`${localBase}/api/admin/auth/login`, { method: 'POST' }, { username: 'test', password: 'bad' });
    const r6Route = await request(`${renderBase}/api/admin/auth/login`, { method: 'POST' }, { username: 'test', password: 'bad' });
    const v6Route = await request(`${vercelBase}/api/admin/auth/login`, { method: 'POST' }, { username: 'test', password: 'bad' });
    l6Pass = l6Route.status === 401;
    r6Pass = r6Route.status === 401;
    v6Pass = v6Route.status === 401;
    console.log(`\n[6/6] POST /api/admin/auth/login (Route Check):`);
    console.log(`  - LOCAL  : Status ${l6Route.status} (${l6Route.timeMs}ms)`);
    console.log(`  - RENDER : Status ${r6Route.status} (${r6Route.timeMs}ms)`);
    console.log(`  - VERCEL : Status ${v6Route.status} (${v6Route.timeMs}ms)`);
  }

  testMatrix.push({
    test: 'POST /api/admin/auth/login',
    local: l6Pass ? 'PASS (Active)' : 'FAIL',
    render: r6Pass ? 'PASS (Active)' : 'FAIL',
    vercel: v6Pass ? 'PASS (Active)' : 'FAIL',
    result: l6Pass && r6Pass && v6Pass ? 'PASS' : 'FAIL'
  });

  // Print Summary Table
  console.log('\n========================================================================================');
  console.log('  🧪 TRIPLE-ENVIRONMENT VERIFICATION MATRIX (LOCAL | RENDER DIRECT | VERCEL PROXY)');
  console.log('========================================================================================\n');
  console.log('| TEST | LOCAL | RENDER | VERCEL | RESULT |');
  console.log('| :--- | :---: | :---: | :---: | :---: |');
  for (const item of testMatrix) {
    const resBadge = item.result === 'PASS' ? '**PASS**' : '**FAIL**';
    console.log(`| ${item.test} | ${item.local} | ${item.render} | ${item.vercel} | ${resBadge} |`);
  }
  console.log('\n');
}

runThreeWayVerification();
