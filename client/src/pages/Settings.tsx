import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getScrapingSettings, 
  getStorageSettings, 
  getDisplaySettings,
  saveScrapingSettings,
  saveStorageSettings,
  saveDisplaySettings
} from "@/api/scraperService";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch scraping settings
  const { 
    data: scrapingSettings, 
    isLoading: scrapingLoading, 
    isError: scrapingError 
  } = useQuery({
    queryKey: ['/api/settings/scraping'],
    queryFn: getScrapingSettings
  });

  // Fetch storage settings
  const { 
    data: storageSettings, 
    isLoading: storageLoading, 
    isError: storageError 
  } = useQuery({
    queryKey: ['/api/settings/storage'],
    queryFn: getStorageSettings
  });

  // Fetch display settings
  const { 
    data: displaySettings, 
    isLoading: displayLoading, 
    isError: displayError 
  } = useQuery({
    queryKey: ['/api/settings/display'],
    queryFn: getDisplaySettings
  });

  // Mutations for saving settings
  const scrapingMutation = useMutation({
    mutationFn: saveScrapingSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/scraping'] });
      toast({
        title: "Settings Saved",
        description: "Scraping settings have been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Saving Settings",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  const storageMutation = useMutation({
    mutationFn: saveStorageSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/storage'] });
      toast({
        title: "Settings Saved",
        description: "Storage settings have been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Saving Settings",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  const displayMutation = useMutation({
    mutationFn: saveDisplaySettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/display'] });
      toast({
        title: "Settings Saved",
        description: "Display settings have been updated successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Saving Settings",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  });

  // Check if there are any loading or error states
  const isLoading = scrapingLoading || storageLoading || displayLoading;
  const isError = scrapingError || storageError || displayError;

  // Handle saving scraping settings
  const handleSaveScrapingSettings = (settings: typeof scrapingSettings) => {
    if (settings) {
      scrapingMutation.mutate(settings);
    }
  };

  // Handle saving storage settings
  const handleSaveStorageSettings = (settings: typeof storageSettings) => {
    if (settings) {
      storageMutation.mutate(settings);
    }
  };

  // Handle saving display settings
  const handleSaveDisplaySettings = (settings: typeof displaySettings) => {
    if (settings) {
      displayMutation.mutate(settings);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-6">Settings</h2>
      
      {/* Loading state */}
      {isLoading && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 max-w-3xl animate-pulse">
          <div className="flex border-b border-gray-200">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="px-6 py-3 h-10 bg-gray-200 rounded-md m-2"></div>
            ))}
          </div>
          <div className="p-6 space-y-6">
            {Array(3).fill(0).map((_, index) => (
              <div key={index}>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {Array(4).fill(0).map((_, idx) => (
                    <div key={idx} className="h-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-3">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 p-8 max-w-3xl text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Settings</h3>
          <p className="text-gray-500 mb-4">There was a problem loading your settings. Please try again later.</p>
          <button 
            className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {/* Settings content */}
      {!isLoading && !isError && scrapingSettings && storageSettings && displaySettings && (
        <SettingsTabs 
          scrapingSettings={scrapingSettings}
          onSaveScrapingSettings={handleSaveScrapingSettings}
          storageSettings={storageSettings}
          onSaveStorageSettings={handleSaveStorageSettings}
          displaySettings={displaySettings}
          onSaveDisplaySettings={handleSaveDisplaySettings}
        />
      )}
    </div>
  );
};

export default Settings;
