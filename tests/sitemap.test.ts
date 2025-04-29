import { expect, test } from '@playwright/test';
import { parseStringPromise } from 'xml2js';  // To parse XML content from sitemap


test.describe('Sitemap and Crawlability Tests', () => {

  const sitemapUrl = 'https://www.netlify.com/sitemap.xml'; 

  // Test 1: Verify that sitemap.xml exists and is accessible
  test('verify_sitemap_exists', async ({ page }) => {
    const response = await page.goto(sitemapUrl);
    expect(response && response.status()).toBe(200);
  });

  // Test 2: Check that URLs listed in the sitemap are accessible
  test('verify_sitemap_urls_accessible', async ({ page }) => {
    const response = await page.goto(sitemapUrl);
    if (!response) {
      throw new Error('Failed to fetch the sitemap.');
    }
    const xmlContent = await response.text();

    // Parse the XML content of the sitemap
    const parsedSitemap = await parseStringPromise(xmlContent);
    const urls = parsedSitemap.urlset.url.map((entry) => entry.loc[0]);

    // Check that each URL listed in the sitemap is accessible
    for (const url of urls) {
      const urlResponse = await page.goto(url);
      console.log(`Checking URL: ${url}`);
      if (!urlResponse) {
        throw new Error(`Failed to fetch the URL: ${url}`);
      }
      await expect(urlResponse.status()).toBe(200); // Ensure the URL is accessible
    }
  });

  // Test 3: Ensure that pages don't have robots noindex meta tags unless specifically intended
  test('verify_noindex_tags_absent_on_pages', async ({ page }) => {
    const pagesToCheck = [
      'https://www.netlify.com/', 
      'https://www.netlify.com/blog/',
      'https://www.netlify.com/contact/',
    ];

    for (const pageUrl of pagesToCheck) {
      await page.goto(pageUrl);
      const noIndexMetaTag = await page.$('meta[name="robots"][content="noindex"]');
      expect(noIndexMetaTag).toBeNull();
    }
  });

  const importantPages = [
    'https://www.netlify.com/',
    'https://www.netlify.com/products/',
    'https://www.netlify.com/pricing/',
    'https://www.netlify.com/blog/',
    'https://www.netlify.com/docs/',
    'https://www.netlify.com/contact/',
    'https://www.netlify.com/about/',
  ];
  
  test.describe('Important pages crawlability', () => {
    for (const url of importantPages) {
      test(`Verify crawlability for ${url}`, async ({ page, request }) => {
        // 1. Check if page returns 200 OK
        const response = await request.get(url);
        expect(response.status()).toBe(200);
  
    
        await page.goto(url);
        const robotsMeta = await page.locator('meta[name="robots"]').first();
        if (await robotsMeta.count() > 0) {
          const content = await robotsMeta.getAttribute('content');
          expect(content?.toLowerCase()).not.toContain('noindex');
        }

        const headers = response.headers();
        const xRobotsTag = headers['x-robots-tag'];
        if (xRobotsTag) {
          expect(xRobotsTag.toLowerCase()).not.toContain('noindex');
        }
  
      });
    }
  
    test('Verify robots.txt allows crawling', async ({ request }) => {
      const robotsResponse = await request.get('https://www.netlify.com/robots.txt');
      expect(robotsResponse.status()).toBe(200);
      const robotsTxt = await robotsResponse.text();
      expect(robotsTxt).toContain('Allow: /');
    });
  });

});
