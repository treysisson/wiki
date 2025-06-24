const FirecrawlApp = require('@mendable/firecrawl-js').default;
const fs = require('fs');

const app = new FirecrawlApp({ 
  apiKey: 'fc-4fa6f46078cb462faefa64988a677efa' 
});

async function scrapeExample() {
  try {
    console.log('Starting scrape of https://example.com...');
    
    const result = await app.scrapeUrl({ 
      url: 'https://example.com',
      pageOptions: {
        onlyMainContent: false,
        includeHtml: true,
        includeMarkdown: true
      }
    });
    
    console.log('Scrape completed successfully!');
    console.log('Content length:', result.content?.length || 0, 'characters');
    
    // Save to markdown file
    const markdownContent = result.content || 'No content found';
    fs.writeFileSync('example.md', markdownContent);
    
    console.log('Content saved to example.md');
    
    // Also log some basic info
    console.log('Title:', result.metadata?.title || 'No title');
    console.log('Description:', result.metadata?.description || 'No description');
    
  } catch (error) {
    console.error('Error scraping website:', error);
  }
}

scrapeExample(); 