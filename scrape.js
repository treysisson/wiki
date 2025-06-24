const { FirecrawlApp } = require('firecrawl-mcp');
const fs = require('fs');

// Your API key
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

const urls = [
    "https://ballerinafarm.com/products/farmer-protein-powder-variety-pack",
    "https://www.equipfoods.com/products/prime-protein-beef-isolate-protein",
    "https://www.momentumshake.com/",
    "https://shop.katefarms.com/products/nutrition-shake",
    "https://www.kachava.com/products/shakes/chocolate",
    "https://ritual.com/products/essential-protein-daily-shake-18",
    "https://liveowyn.com/products/protein-shakes/?sku=8839",
    "https://huel.com/products/huel-black-edition",
    "https://aloha.com/products/chocolate-protein-powder?selling_plan=1273954364",
    "https://lineageprovisions.com/products/animal-based-complete-grass-fed-beef-protein-organ-fruit-powder",
    "https://nobleorigins.com/"
];

async function scrapeCompetitors() {
    let allData = '';
    for (const url of urls) {
        try {
            console.log(`Scraping ${url}...`);
            const result = await app.scrape(url, {
                pageOptions: {
                    skipTlsVerification: true
                }
            });
            if (result && result.data && result.data.markdown) {
                allData += `## Scraped Content for: ${url}\n\n${result.data.markdown}\n\n---\n\n`;
            }
        } catch (error) {
            console.error(`Error scraping ${url}:`, error);
            allData += `## FAILED to scrape: ${url}\n\n---\n\n`;
        }
    }
    fs.writeFileSync('docs/scraped_competitors.md', allData);
    console.log('Scraping complete. Data saved to docs/scraped_competitors.md');
}

scrapeCompetitors(); 