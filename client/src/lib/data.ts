import { 
  Category,
  ScrapingActivity,
  ScrapingSettings,
  StorageSettings,
  DisplaySettings
} from './types';

// This file provides empty initial structures for data we expect from the API
// These will be replaced by actual API calls

// Categories structure
export const emptyCategories: Category[] = [];

// Activities structure
export const emptyActivities: ScrapingActivity[] = [];

// Default settings
export const defaultScrapingSettings: ScrapingSettings = {
  frequency: 'daily',
  contentTypes: {
    articles: true,
    images: true,
    products: true,
    reviews: true,
    news: true,
    social: true
  },
  sources: ['https://example.com/blog', 'https://example.com/products', 'https://news.example.com']
};

export const defaultStorageSettings: StorageSettings = {
  type: 'local',
  retention: '6months',
  exportFormats: {
    csv: true,
    json: true,
    pdf: true,
    excel: false
  }
};

export const defaultDisplaySettings: DisplaySettings = {
  theme: 'light',
  layout: 'grid',
  itemsPerPage: 20
};
