const axios = require('axios');

const httpClient = axios.create();
const log = (message) => console.table(message);

httpClient.interceptors.request.use((config) => {
  log(config.headers);
  return config;
});

const createSimpleRequest = async (url) => {
  const res = await httpClient.get(url);
  return res;
};

const run = async () => {
  const [, , requestUrl] = process.argv;
  let intervalId = null;
  let intervalCount = 0;
  intervalId = setInterval(async () => {
    intervalCount += 1;
    const res = await createSimpleRequest(requestUrl);
    log(res.headers);
    if (intervalCount === 2) {
      clearInterval(intervalId);
    }
  }, 500);
};

run();
