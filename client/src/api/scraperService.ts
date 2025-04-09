import { apiRequest } from '@/lib/queryClient';
import { 
  Category, 
  Content, 
  ScrapingActivity,
  FilterOptions,
  SortOption,
  ScrapingSettings,
  StorageSettings,
  DisplaySettings
} from '@/lib/types';

// API interfaces for future FastAPI backend integration

// Get all content categories
export async function getContentCategories(): Promise<Category[]> {
  // This would be replaced with actual API call
  // For now, return empty array as we don't want to mock data
  return [];
}

// Get recent scraping activities
export async function getRecentActivities(): Promise<ScrapingActivity[]> {
  // This would be replaced with actual API call
  // For now, return empty array as we don't want to mock data
  return [];
}

// Get all content items with filtering and sorting
export async function getContentItems(
  filters: FilterOptions,
  sort: SortOption,
  page: number,
  limit: number
): Promise<{
  items: Content[];
  total: number;
}> {
  // This would be replaced with actual API call
  // For now, return empty result as we don't want to mock data
  return {
    items: [],
    total: 0
  };
}

// Get a specific content item by ID
export async function getContentItem(id: string): Promise<Content | null> {
  // This would be replaced with actual API call
  // For now, return null as we don't want to mock data
  return null;
}

// Settings API services
export async function getScrapingSettings(): Promise<ScrapingSettings> {
  // This would be replaced with actual API call
  return {
    frequency: 'daily',
    contentTypes: {
      articles: true,
      images: true,
      products: true,
      reviews: true,
      news: true,
      social: true
    },
    sources: []
  };
}

export async function saveScrapingSettings(settings: ScrapingSettings): Promise<void> {
  // This would be implemented with actual API call
  console.log('Saving scraping settings:', settings);
}

export async function getStorageSettings(): Promise<StorageSettings> {
  // This would be replaced with actual API call
  return {
    type: 'local',
    retention: '6months',
    exportFormats: {
      csv: true,
      json: true,
      pdf: true,
      excel: false
    }
  };
}

export async function saveStorageSettings(settings: StorageSettings): Promise<void> {
  // This would be implemented with actual API call
  console.log('Saving storage settings:', settings);
}

export async function getDisplaySettings(): Promise<DisplaySettings> {
  // This would be replaced with actual API call
  return {
    theme: 'light',
    layout: 'grid',
    itemsPerPage: 20
  };
}

export async function saveDisplaySettings(settings: DisplaySettings): Promise<void> {
  // This would be implemented with actual API call
  console.log('Saving display settings:', settings);
}

// Export functionality
export async function exportData(format: string): Promise<Blob> {
  // This would be implemented with actual API call
  // For now, return a simple placeholder Blob
  return new Blob([''], { type: 'text/plain' });
}
