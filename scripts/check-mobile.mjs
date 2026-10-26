import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

await mkdir('design/qa', { recursive: true });
const menus = ['bar', 'mediterraneo', 'producto', 'michelin', 'canton'];
const foodCounts = { bar: 14, mediterraneo: 13, producto: 11, michelin: 8, canton: 14 };
const baseUrl = process.env.MENU_BASE_URL ?? 'http://127.0.0.1:4321/';
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
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
      allergenSections: panel.querySelectorAll('details.allergen-info').length,
      brokenImages: images.filter((image) => image.complete && image.naturalWidth === 0).length,
      firstSectionY: panel.querySelector('section[id]')?.getBoundingClientRect().top,
    };
  }, menu);
  console.log(menu, info);
  if (info.allergenSections !== foodCounts[menu]) throw new Error(`${menu}: missing allergen sections`);
  if (info.overflow > 0) throw new Error(`${menu}: horizontal overflow at 390px`);
  const firstAllergen = page.locator(`#panel-${menu} details.allergen-info`).first();
  await firstAllergen.locator('summary').click();
  if (!(await firstAllergen.evaluate((element) => element.open))) throw new Error(`${menu}: allergen section did not open`);
  await firstAllergen.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `design/qa/${menu}-allergens-390.png` });
  await firstAllergen.locator('summary').click();
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
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${menu}: horizontal overflow at 320px`);
}

const imageStatuses = await page.evaluate(async () => {
  const sources = [...new Set([...document.querySelectorAll('[data-photo-src]')].map((button) => button.dataset.photoSrc))];
  return Promise.all(sources.map(async (src) => ({ src, status: (await fetch(src, { method: 'HEAD' })).status })));
});
console.log('foodPhotos', imageStatuses.length, 'missing', imageStatuses.filter((item) => item.status !== 200));

await page.setViewportSize({ width: 1280, height: 850 });
for (const menu of menus) {
  await page.locator(`#tab-${menu}`).click();
  await page.screenshot({ path: `design/qa/${menu}-1280.png` });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(`overflow1280-${menu}`, overflow);
  if (overflow > 0) throw new Error(`${menu}: horizontal overflow at 1280px`);
}

await browser.close();
