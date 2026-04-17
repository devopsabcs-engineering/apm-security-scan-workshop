// Playwright helper utilities for APM Security Scan Workshop screenshots
const { chromium } = require('playwright');

async function captureScreenshot(url, outputPath, options = {}) {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: options.width || 1280, height: options.height || 720 },
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  if (options.selector) {
    const element = await page.$(options.selector);
    if (element) {
      await element.screenshot({ path: outputPath });
    }
  } else {
    await page.screenshot({ path: outputPath, fullPage: options.fullPage || false });
  }

  await browser.close();
  return outputPath;
}

module.exports = { captureScreenshot };
