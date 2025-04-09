import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getContentCategories, getRecentActivities } from "@/api/scraperService";
import CategoryCard from "@/components/home/CategoryCard";
import ActivityTable from "@/components/home/ActivityTable";
import { Category, ScrapingActivity } from "@/lib/types";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories
  const { 
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: getContentCategories
  });

  // Fetch recent activities
  const { 
    data: activities = [],
    isLoading: activitiesLoading,
    isError: activitiesError
  } = useQuery<ScrapingActivity[]>({
    queryKey: ['/api/activities/recent'],
    queryFn: getRecentActivities
  });

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-4 sm:mb-0">Recent Scraped Content</h2>
        
        {/* SearchBar Component */}
        <div className="w-full sm:w-64 relative">
          <input 
            type="text" 
            placeholder="Search content..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Categories Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesLoading && (
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))
        )}

        {categoriesError && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-500 mb-2">Failed to load categories</p>
            <button 
              className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!categoriesLoading && !categoriesError && filteredCategories.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No categories found. Add sources in the settings to start scraping.</p>
          </div>
        )}

        {!categoriesLoading && !categoriesError && filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[#2D2D2D] mb-4">Recent Scraping Activity</h2>
        
        {activitiesLoading && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 animate-pulse">
            <div className="h-10 bg-[#F5F5F5]"></div>
            <div className="px-6 py-4 space-y-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        )}

        {activitiesError && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 p-6 text-center">
            <p className="text-red-500 mb-2">Failed to load activity data</p>
            <button 
              className="px-4 py-2 bg-[#007AFF] text-white rounded-md hover:bg-blue-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!activitiesLoading && !activitiesError && (
          <ActivityTable activities={activities} />
        )}
      </div>
    </div>
  );
};

export default Home;
