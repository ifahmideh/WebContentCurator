import { useState } from "react";
import { 
  ScrapingSettings, 
  StorageSettings,
  DisplaySettings
} from "@/lib/types";

interface SettingsTabsProps {
  scrapingSettings: ScrapingSettings;
  onSaveScrapingSettings: (settings: ScrapingSettings) => void;
  storageSettings: StorageSettings;
  onSaveStorageSettings: (settings: StorageSettings) => void;
  displaySettings: DisplaySettings;
  onSaveDisplaySettings: (settings: DisplaySettings) => void;
}

const SettingsTabs = ({ 
  scrapingSettings, 
  onSaveScrapingSettings,
  storageSettings,
  onSaveStorageSettings,
  displaySettings,
  onSaveDisplaySettings
}: SettingsTabsProps) => {
  const [activeTab, setActiveTab] = useState<'scraping' | 'storage' | 'display'>('scraping');
  
  // Local state for scraping settings
  const [localScrapingSettings, setLocalScrapingSettings] = useState<ScrapingSettings>(scrapingSettings);
  
  // Local state for storage settings
  const [localStorageSettings, setLocalStorageSettings] = useState<StorageSettings>(storageSettings);
  
  // Local state for display settings
  const [localDisplaySettings, setLocalDisplaySettings] = useState<DisplaySettings>(displaySettings);
  
  // Update local scraping settings
  const updateScrapingSettings = (field: keyof ScrapingSettings, value: any) => {
    setLocalScrapingSettings({ ...localScrapingSettings, [field]: value });
  };
  
  // Update content types in scraping settings
  const updateContentType = (type: keyof ScrapingSettings['contentTypes'], checked: boolean) => {
    setLocalScrapingSettings({
      ...localScrapingSettings,
      contentTypes: {
        ...localScrapingSettings.contentTypes,
        [type]: checked
      }
    });
  };
  
  // Add a new source URL
  const addSourceUrl = () => {
    setLocalScrapingSettings({
      ...localScrapingSettings,
      sources: [...localScrapingSettings.sources, '']
    });
  };
  
  // Update a source URL
  const updateSourceUrl = (index: number, value: string) => {
    const newSources = [...localScrapingSettings.sources];
    newSources[index] = value;
    setLocalScrapingSettings({
      ...localScrapingSettings,
      sources: newSources
    });
  };
  
  // Update local storage settings
  const updateStorageSettings = (field: keyof StorageSettings, value: any) => {
    setLocalStorageSettings({ ...localStorageSettings, [field]: value });
  };
  
  // Update export formats in storage settings
  const updateExportFormat = (format: keyof StorageSettings['exportFormats'], checked: boolean) => {
    setLocalStorageSettings({
      ...localStorageSettings,
      exportFormats: {
        ...localStorageSettings.exportFormats,
        [format]: checked
      }
    });
  };
  
  // Update local display settings
  const updateDisplaySettings = (field: keyof DisplaySettings, value: any) => {
    setLocalDisplaySettings({ ...localDisplaySettings, [field]: value });
  };
  
  // Save current tab settings
  const saveSettings = () => {
    switch (activeTab) {
      case 'scraping':
        onSaveScrapingSettings(localScrapingSettings);
        break;
      case 'storage':
        onSaveStorageSettings(localStorageSettings);
        break;
      case 'display':
        onSaveDisplaySettings(localDisplaySettings);
        break;
    }
  };
  
  // Cancel changes
  const cancelChanges = () => {
    switch (activeTab) {
      case 'scraping':
        setLocalScrapingSettings(scrapingSettings);
        break;
      case 'storage':
        setLocalStorageSettings(storageSettings);
        break;
      case 'display':
        setLocalDisplaySettings(displaySettings);
        break;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 max-w-3xl">
      {/* Settings Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'scraping' 
              ? 'text-[#007AFF] border-b-2 border-[#007AFF]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('scraping')}
        >
          Scraping Settings
        </button>
        <button 
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'storage' 
              ? 'text-[#007AFF] border-b-2 border-[#007AFF]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('storage')}
        >
          Storage Settings
        </button>
        <button 
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'display' 
              ? 'text-[#007AFF] border-b-2 border-[#007AFF]' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('display')}
        >
          Display Settings
        </button>
      </div>
      
      {/* Scraping Settings Tab Content */}
      <div className={`p-6 settings-content ${activeTab !== 'scraping' ? 'hidden' : ''}`}>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Scraping Frequency</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="frequency" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300" 
                checked={localScrapingSettings.frequency === 'daily'}
                onChange={() => updateScrapingSettings('frequency', 'daily')}
              />
              <span className="ml-2 text-sm">Daily</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="frequency" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localScrapingSettings.frequency === 'weekly'}
                onChange={() => updateScrapingSettings('frequency', 'weekly')}
              />
              <span className="ml-2 text-sm">Weekly</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="frequency" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localScrapingSettings.frequency === 'monthly'}
                onChange={() => updateScrapingSettings('frequency', 'monthly')}
              />
              <span className="ml-2 text-sm">Monthly</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="frequency" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localScrapingSettings.frequency === 'once'}
                onChange={() => updateScrapingSettings('frequency', 'once')}
              />
              <span className="ml-2 text-sm">One-time only</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Content Types to Scrape</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.articles}
                onChange={(e) => updateContentType('articles', e.target.checked)}
              />
              <span className="ml-2 text-sm">Articles and Blog Posts</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.images}
                onChange={(e) => updateContentType('images', e.target.checked)}
              />
              <span className="ml-2 text-sm">Images</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.products}
                onChange={(e) => updateContentType('products', e.target.checked)}
              />
              <span className="ml-2 text-sm">Product Listings</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.reviews}
                onChange={(e) => updateContentType('reviews', e.target.checked)}
              />
              <span className="ml-2 text-sm">Reviews</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.news}
                onChange={(e) => updateContentType('news', e.target.checked)}
              />
              <span className="ml-2 text-sm">News Articles</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localScrapingSettings.contentTypes.social}
                onChange={(e) => updateContentType('social', e.target.checked)}
              />
              <span className="ml-2 text-sm">Social Media Posts</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Source URLs</h3>
          <div className="space-y-3">
            {localScrapingSettings.sources.map((source, index) => (
              <div key={index}>
                <label htmlFor={`source-url-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Source URL {index + 1}
                </label>
                <input 
                  type="text" 
                  id={`source-url-${index}`} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#007AFF] focus:border-[#007AFF]"
                  value={source}
                  onChange={(e) => updateSourceUrl(index, e.target.value)}
                />
              </div>
            ))}
            <button 
              className="text-[#007AFF] hover:text-blue-700 text-sm flex items-center"
              onClick={addSourceUrl}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add another source
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={cancelChanges}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
      
      {/* Storage Settings Tab Content */}
      <div className={`p-6 settings-content ${activeTab !== 'storage' ? 'hidden' : ''}`}>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Data Storage</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="storage-type" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.type === 'local'}
                onChange={() => updateStorageSettings('type', 'local')}
              />
              <span className="ml-2 text-sm">Local Database</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="storage-type" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.type === 'cloud'}
                onChange={() => updateStorageSettings('type', 'cloud')}
              />
              <span className="ml-2 text-sm">Cloud Storage</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Data Retention</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="retention" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.retention === '1month'}
                onChange={() => updateStorageSettings('retention', '1month')}
              />
              <span className="ml-2 text-sm">1 Month</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="retention" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.retention === '3months'}
                onChange={() => updateStorageSettings('retention', '3months')}
              />
              <span className="ml-2 text-sm">3 Months</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="retention" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.retention === '6months'}
                onChange={() => updateStorageSettings('retention', '6months')}
              />
              <span className="ml-2 text-sm">6 Months</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="retention" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localStorageSettings.retention === 'unlimited'}
                onChange={() => updateStorageSettings('retention', 'unlimited')}
              />
              <span className="ml-2 text-sm">Unlimited</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Export Options</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localStorageSettings.exportFormats.csv}
                onChange={(e) => updateExportFormat('csv', e.target.checked)}
              />
              <span className="ml-2 text-sm">CSV Export</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localStorageSettings.exportFormats.json}
                onChange={(e) => updateExportFormat('json', e.target.checked)}
              />
              <span className="ml-2 text-sm">JSON Export</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localStorageSettings.exportFormats.pdf}
                onChange={(e) => updateExportFormat('pdf', e.target.checked)}
              />
              <span className="ml-2 text-sm">PDF Export</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                checked={localStorageSettings.exportFormats.excel}
                onChange={(e) => updateExportFormat('excel', e.target.checked)}
              />
              <span className="ml-2 text-sm">Excel Export</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={cancelChanges}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
      
      {/* Display Settings Tab Content */}
      <div className={`p-6 settings-content ${activeTab !== 'display' ? 'hidden' : ''}`}>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Theme</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="theme" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.theme === 'light'}
                onChange={() => updateDisplaySettings('theme', 'light')}
              />
              <span className="ml-2 text-sm">Light Mode</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="theme" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.theme === 'dark'}
                onChange={() => updateDisplaySettings('theme', 'dark')}
              />
              <span className="ml-2 text-sm">Dark Mode</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="theme" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.theme === 'system'}
                onChange={() => updateDisplaySettings('theme', 'system')}
              />
              <span className="ml-2 text-sm">System Default</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Layout</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="layout" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.layout === 'grid'}
                onChange={() => updateDisplaySettings('layout', 'grid')}
              />
              <span className="ml-2 text-sm">Grid View</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="layout" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.layout === 'list'}
                onChange={() => updateDisplaySettings('layout', 'list')}
              />
              <span className="ml-2 text-sm">List View</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="layout" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.layout === 'compact'}
                onChange={() => updateDisplaySettings('layout', 'compact')}
              />
              <span className="ml-2 text-sm">Compact View</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">Items Per Page</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="per-page" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.itemsPerPage === 10}
                onChange={() => updateDisplaySettings('itemsPerPage', 10)}
              />
              <span className="ml-2 text-sm">10 items</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="per-page" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.itemsPerPage === 20}
                onChange={() => updateDisplaySettings('itemsPerPage', 20)}
              />
              <span className="ml-2 text-sm">20 items</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="per-page" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.itemsPerPage === 50}
                onChange={() => updateDisplaySettings('itemsPerPage', 50)}
              />
              <span className="ml-2 text-sm">50 items</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="per-page" 
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300"
                checked={localDisplaySettings.itemsPerPage === 100}
                onChange={() => updateDisplaySettings('itemsPerPage', 100)}
              />
              <span className="ml-2 text-sm">100 items</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={cancelChanges}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabs;
