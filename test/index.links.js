import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export async function checkLinks() {
  const responseArray = [];
  const dom = await JSDOM.fromFile('./public/index.html', {});

  const anchors = dom.window.document.querySelectorAll('a');

  for await (const anchor of anchors) {
    const url = anchor.href;
    try {
      const response = await fetch(url);
      const statusCode = response.status;
      responseArray.push({ href: url, statusCode });
    } catch (error) {
      responseArray.push({ href: url, statusCode: error.message });
    }
  }
  const noBrokenLinks = {
      errors: []
  };
  responseArray.filter(response => typeof response.statusCode !== 'number' || response.statusCode >= 400).forEach(status => {
      noBrokenLinks.errors.push(status.href);
  });
  noBrokenLinks.status = responseArray.every((resp) => resp.statusCode < 400);
  return noBrokenLinks;
}