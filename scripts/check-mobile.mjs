import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

await mkdir('design/qa', { recursive: true });
const menus = ['bar', 'mediterraneo', 'producto', 'michelin', 'canton'];
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(800);

for (const menu of menus) {
  await page.locator(`#tab-${menu}`).click();
  await page.screenshot({ path: `design/qa/${menu}-390.png` });
  const info = await page.evaluate((id) => {
    const panel = document.getElementById(`panel-${id}`);
    const images = [...panel.querySelectorAll('img')];
    return {
      overflow: document.documentElement.scrollWidth - innerWidth,
      dishes: panel.querySelectorAll('[data-photo-open]').length,
      brokenImages: images.filter((image) => image.complete && image.naturalWidth === 0).length,
      firstSectionY: panel.querySelector('section[id]')?.getBoundingClientRect().top,
    };
  }, menu);
  console.log(menu, info);
}

await page.locator('#tab-bar').click();
await page.locator('#panel-bar [data-photo-open]').first().click();
console.log('dialogOpen', await page.locator('#photo-dialog').evaluate((element) => element.open));
await page.screenshot({ path: 'design/qa/photo-dialog-390.png' });
await page.locator('[data-3d-button]').click();
await page.locator('[data-ar-launch]').waitFor({ state: 'visible' });
await page.waitForTimeout(1000);
console.log('arDialogOpen', await page.locator('#ar-dialog').evaluate((element) => element.open));
console.log('arModelLoaded', await page.locator('#bravas-model').evaluate((element) => element.loaded));
await page.screenshot({ path: 'design/qa/ar-dialog-390.png' });
await page.keyboard.press('Escape');
console.log('arDialogClosed', !(await page.locator('#ar-dialog').evaluate((element) => element.open)));

await page.setViewportSize({ width: 320, height: 740 });
await page.screenshot({ path: 'design/qa/bar-320.png' });
console.log('overflow320', await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
for (const menu of menus) {
  await page.locator(`#tab-${menu}`).click();
  console.log(`overflow320-${menu}`, await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
}

const imageStatuses = await page.evaluate(async () => {
  const sources = [...new Set([...document.querySelectorAll('[data-photo-src]')].map((button) => button.dataset.photoSrc))];
  return Promise.all(sources.map(async (src) => ({ src, status: (await fetch(src, { method: 'HEAD' })).status })));
});
console.log('foodPhotos', imageStatuses.length, 'missing', imageStatuses.filter((item) => item.status !== 200));

await page.setViewportSize({ width: 1280, height: 850 });
await page.locator('#tab-bar').click();
await page.screenshot({ path: 'design/qa/bar-1280.png' });
console.log('overflow1280', await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));

await browser.close();
