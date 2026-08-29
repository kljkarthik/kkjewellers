// Lightweight in-memory TTL cache with request deduplication
const cacheStore = new Map();
const pendingRequests = new Map();

/**
 * Fetch data with caching & in-flight request deduplication.
 * @param {string} key - Cache key.
 * @param {Function} fetcherFn - Async function to fetch fresh data.
 * @param {number} ttlMs - Time to live in milliseconds (default: 5 mins).
 */
export const fetchWithCache = async (key, fetcherFn, ttlMs = 5 * 60 * 1000) => {
  const now = Date.now();
  const cached = cacheStore.get(key);

  // Return cached data if fresh
  if (cached && (now - cached.timestamp < ttlMs)) {
    return cached.data;
  }

  // Deduplicate concurrent in-flight requests for the same key
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }

  const promise = (async () => {
    try {
      const data = await fetcherFn();
      cacheStore.set(key, { data, timestamp: Date.now() });
      return data;
    } finally {
      pendingRequests.delete(key);
    }
  })();

  pendingRequests.set(key, promise);
  return promise;
};

/**
 * Invalidate a specific cache key or all cache.
 */
export const invalidateCache = (key) => {
  if (key) {
    cacheStore.delete(key);
  } else {
    cacheStore.clear();
  }
};
