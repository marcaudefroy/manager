/* eslint-disable no-undef */
import { ClientFunction } from 'testcafe';
import { outputFile, outputJson } from 'fs-extra';

/**
 * Simply hide an element.
 */
export async function hideElement(element) {
  return ClientFunction((selector, styleValue) => {
    const el = selector();
    el.setAttribute('style', styleValue);
  })(element, 'none');
}

/**
 * Get page URL.
 */
export async function getPageUrl() {
  return ClientFunction(() => window.location.href)();
}

export async function getNetworkLogs(logger, testName) {
  await outputJson(
    `./reports/reportLog_${logger.requests[0].testRunId}.json`,
    logger.requests,
    { spaces: 2, encoding: 'utf8' },
  );
  Promise.all(logger.requests);
  let text = `<p>${testName}</p>
  <table border='1' style="background-color:lavender;">
    <tr>
    <th>test network call id</th>
    <th>method</th>
    <th>url</th>
    <th>response status</th>
    <th>call duration</th>
    <th>ovh query id</th>
  </tr>`;
  logger.requests.forEach(async (element) => {
    text += `<tr>
        <td>${element.id}</td>
        <td>${element.request.method}</td>
        <td>${element.request.url}</td>
        <td>${element.response.statusCode}</td>
        <td>${element.response.timestamp - element.request.timestamp}</td>
        <td>${element.response.headers['x-ovh-queryid']}</td>
      </tr>`;
  });
  text += '</table>';
  outputFile(`./reports/reportLog_${logger.requests[0].testRunId}.html`, text);
}
