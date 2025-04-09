import React from "react";

const About = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">About Content Scraper</h2>
      
      <div className="max-w-3xl">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-medium text-[#2D2D2D] mb-3">What is Content Scraper?</h3>
            <p className="text-gray-600 mb-4">
              Content Scraper is a powerful web-based tool designed to collect and organize content from various websites. 
              It allows you to automatically gather articles, images, product listings, reviews, and more, and presents them in a clean, organized interface.
            </p>
            <p className="text-gray-600">
              Our system uses advanced techniques to extract meaningful data while respecting website terms of service and robots.txt files. 
              All data is stored securely and can be easily exported in various formats.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-medium text-[#2D2D2D] mb-3">How to Use</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li><span className="font-medium">Configure Sources:</span> Go to Settings and add the URLs you want to scrape.</li>
              <li><span className="font-medium">Select Content Types:</span> Choose what kind of content you want to collect.</li>
              <li><span className="font-medium">Set Frequency:</span> Decide how often you want to scrape content.</li>
              <li><span className="font-medium">Browse Content:</span> Use the Home and Data pages to view and explore collected content.</li>
              <li><span className="font-medium">Search and Filter:</span> Find specific content using search and filtering options.</li>
              <li><span className="font-medium">Export Data:</span> Download your data in various formats for external use.</li>
            </ol>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-medium text-[#2D2D2D] mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Is web scraping legal?</h4>
                <p className="text-gray-600 text-sm">
                  Web scraping can be legal depending on the website's terms of service, the data being scraped, and how it's used. 
                  Our tool respects robots.txt files and rate limits to avoid overwhelming servers.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">How much data can I store?</h4>
                <p className="text-gray-600 text-sm">
                  Storage limits depend on your plan. The free plan allows up to 1,000 items, while premium plans offer expanded storage capacities.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I scrape any website?</h4>
                <p className="text-gray-600 text-sm">
                  Many websites can be scraped, but some use anti-scraping measures or have terms prohibiting scraping. 
                  Always check a website's terms of service before scraping.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">How often is data updated?</h4>
                <p className="text-gray-600 text-sm">
                  You can configure scraping frequency in the Settings page, ranging from one-time scraping to daily, weekly, or monthly intervals.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Can I export my collected data?</h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can export data in CSV, JSON, PDF, and other formats depending on your settings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Content Scraper v1.0.0 • © {new Date().getFullYear()} • 
            <a href="#" className="text-[#007AFF] hover:underline ml-1">Terms of Service</a> • 
            <a href="#" className="text-[#007AFF] hover:underline ml-1">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
