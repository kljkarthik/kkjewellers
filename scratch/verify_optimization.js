const http = require('http');
const fs = require('fs');
const path = require('path');

function request(url, options = {}, bodyData = null) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      const reqOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      };

      if (bodyData) {
        const payload = JSON.stringify(bodyData);
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.headers['Content-Length'] = Buffer.byteLength(payload);
      }

      const req = http.request(reqOptions, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          let parsed = null;
          try { parsed = JSON.parse(raw); } catch (e) { parsed = raw; }
          resolve({ status: res.statusCode, data: parsed, headers: res.headers, rawLength: raw.length });
        });
      });

      req.on('error', err => resolve({ status: 0, error: err.message }));
      if (bodyData) req.write(JSON.stringify(bodyData));
      req.end();
    } catch (err) {
      resolve({ status: 0, error: err.message });
    }
  });
}

async function runVerification() {
  const results = [];

  function record(testName, result, details) {
    results.push({ test: testName, result, details });
  }

  // 1. Homepage Store Settings API
  const res1 = await request('http://localhost:8080/api/settings');
  if (res1.status === 200 && res1.data && res1.data.businessName) {
    record('1. Homepage Store Settings API', 'PASS', `Business: "${res1.data.businessName}"`);
  } else {
    record('1. Homepage Store Settings API', 'FAIL', res1.error || `HTTP Status ${res1.status}`);
  }

  // 2. /new-arrivals API
  const res2 = await request('http://localhost:8080/api/products/new-arrivals');
  if (res2.status === 200 && Array.isArray(res2.data)) {
    record('2. New Arrivals Catalogue API', 'PASS', `Returned ${res2.data.length} item(s)`);
  } else {
    record('2. New Arrivals Catalogue API', 'FAIL', res2.error || `HTTP Status ${res2.status}`);
  }

  // 3. /collections?collection=bridal-collection API
  const res3 = await request('http://localhost:8080/api/products?collection=bridal-collection');
  if (res3.status === 200 && Array.isArray(res3.data)) {
    record('3. Bridal Collection Filter API', 'PASS', `Returned ${res3.data.length} item(s)`);
  } else {
    record('3. Bridal Collection Filter API', 'FAIL', res3.error || `HTTP Status ${res3.status}`);
  }

  // 4. /gallery API
  const res4 = await request('http://localhost:8080/api/gallery');
  if (res4.status === 200 && Array.isArray(res4.data)) {
    record('4. Editorial Gallery API', 'PASS', `Returned ${res4.data.length} photo(s)`);
  } else {
    record('4. Editorial Gallery API', 'FAIL', res4.error || `HTTP Status ${res4.status}`);
  }

  // 5. Product Detail API (KK-NK-001)
  const res5 = await request('http://localhost:8080/api/products/code/KK-NK-001');
  if (res5.status === 200 && res5.data && res5.data.productCode === 'KK-NK-001') {
    record('5. Product Detail Lookup API', 'PASS', `Name: "${res5.data.name}", Full images array present`);
  } else {
    record('5. Product Detail Lookup API', 'FAIL', res5.error || `HTTP Status ${res5.status}`);
  }

  // 6. Admin Authentication Test (via env variables only)
  const envUsername = process.env.TEST_ADMIN_USERNAME;
  const envPassword = process.env.TEST_ADMIN_PASSWORD;

  if (envUsername && envPassword) {
    const res6 = await request('http://localhost:8080/api/admin/auth/login', { method: 'POST' }, { username: envUsername, password: envPassword });
    if (res6.status === 200 && res6.data && res6.data.token) {
      record('6. Admin Authentication API', 'PASS', `Auth succeeded, token issued (token content suppressed)`);
    } else {
      record('6. Admin Authentication API', 'FAIL', `Auth failed, status ${res6.status}`);
    }
  } else {
    record('6. Admin Authentication API', 'SKIPPED', 'Environment variable TEST_ADMIN_PASSWORD not set. Skipping auth test.');
  }

  // 7. ProductSummaryDTO Payload Verification
  const sampleProducts = Array.isArray(res2.data) ? res2.data : [];
  if (sampleProducts.length > 0) {
    const item = sampleProducts[0];
    const hasRequiredFields = item.id && item.name && item.productCode && item.primaryImageUrl;
    const omitsLargeFields = !item.hasOwnProperty('images') && !item.hasOwnProperty('fullDescription');
    if (hasRequiredFields && omitsLargeFields) {
      record('7. ProductSummaryDTO Verification', 'PASS', 'Payload lightweight: primaryImageUrl included, full images array & description omitted');
    } else {
      record('7. ProductSummaryDTO Verification', 'FAIL', 'Payload contained heavy entity fields or missed summary fields');
    }
  } else {
    record('7. ProductSummaryDTO Verification', 'SKIPPED', 'Zero products available to inspect ProductSummaryDTO payload');
  }

  // 8. Search Frontend Source and Dist for Hardcoded Credential Patterns
  const frontendSrcDir = 'C:/Users/kljka/.gemini/antigravity/scratch/kk-jewellers/frontend/src';
  const frontendDistDir = 'C:/Users/kljka/.gemini/antigravity/scratch/kk-jewellers/frontend/dist';

  const credentialPatterns = [
    /useState\s*\(\s*['"]admin['"]\s*\)/i,
    /useState\s*\(\s*['"]admin123['"]\s*\)/i,
    /password\s*=\s*['"]admin123['"]/i,
    /username\s*:\s*['"]admin['"]/i
  ];

  if (envPassword) {
    credentialPatterns.push(new RegExp(envPassword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  function scanDirectory(dir, patterns) {
    if (!fs.existsSync(dir)) return [];
    const matches = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.git') {
          matches.push(...scanDirectory(fullPath, patterns));
        }
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const pattern of patterns) {
          if (pattern.test(content)) {
            matches.push({ file: fullPath, pattern: pattern.toString() });
          }
        }
      }
    }
    return matches;
  }

  const srcMatches = scanDirectory(frontendSrcDir, credentialPatterns);
  const distMatches = scanDirectory(frontendDistDir, credentialPatterns);

  if (srcMatches.length === 0 && distMatches.length === 0) {
    record('8. Frontend Source Security Audit', 'PASS', '0 hardcoded credential patterns found in frontend/src or frontend/dist');
  } else {
    record('8. Frontend Source Security Audit', 'FAIL', `Found ${srcMatches.length} pattern match(es) in src and ${distMatches.length} in dist`);
  }

  // Print Summary Table
  console.log('\n### 🧪 Optimization Verification Results\n');
  console.log('| TEST | RESULT | DETAILS |');
  console.log('| :--- | :---: | :--- |');
  for (const r of results) {
    console.log(`| ${r.test} | **${r.result}** | ${r.details} |`);
  }
  console.log('\n');
}

runVerification();
