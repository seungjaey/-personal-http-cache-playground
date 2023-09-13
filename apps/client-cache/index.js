const { caching } = require('cache-manager');
const axios = require('axios');

const httpClient = axios.create();
const logTable = (message) => console.table(message);

httpClient.interceptors.request.use((config) => {
  logTable(config.headers);
  return config;
});

const createSimpleRequest = async (url, cacheClient) => {
  const prevData = await cacheClient.get(url);
  if (prevData) {
    return prevData;
  }
  const res = await httpClient.get(url);
  const { headers, data } = res;
  const { etag } = headers;

  await cacheClient.set(url, {
    etag,
    data,
    headers,
  });
  return res;
};

const run = async () => {
  const memoryCache = await caching('memory', {
    max: 100,
    ttl: 10 * 1000 /*milliseconds*/,
  });

  const [, , requestUrl] = process.argv;
  let intervalId = null;
  let intervalCount = 0;
  intervalId = setInterval(async () => {
    intervalCount += 1;
    const res = await createSimpleRequest(requestUrl, memoryCache);
    logTable(res.headers);
    if (intervalCount === 2) {
      clearInterval(intervalId);
    }
  }, 500);
};

run();
