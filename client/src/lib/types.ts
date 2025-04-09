// Content Types
export type ContentType = 'article' | 'image' | 'product' | 'news' | 'social' | 'review';

// Category definition
export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  lastUpdated: string;
  images: string[];
}

// Base content item
export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  source: string;
  timestamp: string;
}

// Specific content type interfaces
export interface ArticleContent extends ContentItem {
  type: 'article';
  content: string;
  summary: string;
}

export interface ImageContent extends ContentItem {
  type: 'image';
  imageUrl: string;
  resolution: string;
  format: string;
  fileSize?: string;
  license?: string;
}

export interface ProductContent extends ContentItem {
  type: 'product';
  imageUrl: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  specifications: string[];
}

export interface NewsContent extends ContentItem {
  type: 'news';
  content: string;
  summary: string;
}

export interface SocialContent extends ContentItem {
  type: 'social';
  username: string;
  handle: string;
  profileImage: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface ReviewContent extends ContentItem {
  type: 'review';
  rating: number;
  content: string;
  reviewer: string;
}

export type Content = 
  | ArticleContent 
  | ImageContent 
  | ProductContent 
  | NewsContent 
  | SocialContent 
  | ReviewContent;

// Activity type
export interface ScrapingActivity {
  id: string;
  date: string;
  source: string;
  type: string;
  itemCount: number;
  status: 'completed' | 'partial' | 'error';
  details?: string;
}

// Filter and Sort options
export interface FilterOptions {
  types: ContentType[];
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

export type SortOption = 'latest' | 'oldest' | 'a-z' | 'z-a';

// Settings interfaces
export type ScrapingFrequency = 'daily' | 'weekly' | 'monthly' | 'once';
export type StorageType = 'local' | 'cloud';
export type RetentionPeriod = '1month' | '3months' | '6months' | 'unlimited';
export type ExportFormat = 'csv' | 'json' | 'pdf' | 'excel';
export type ThemeMode = 'light' | 'dark' | 'system';
export type LayoutView = 'grid' | 'list' | 'compact';
export type ItemsPerPage = 10 | 20 | 50 | 100;

export interface ScrapingSettings {
  frequency: ScrapingFrequency;
  contentTypes: {
    articles: boolean;
    images: boolean;
    products: boolean;
    reviews: boolean;
    news: boolean;
    social: boolean;
  };
  sources: string[];
}

export interface StorageSettings {
  type: StorageType;
  retention: RetentionPeriod;
  exportFormats: {
    csv: boolean;
    json: boolean;
    pdf: boolean;
    excel: boolean;
  };
}

export interface DisplaySettings {
  theme: ThemeMode;
  layout: LayoutView;
  itemsPerPage: ItemsPerPage;
}
