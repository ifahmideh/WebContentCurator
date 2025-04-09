import { useState, useRef, useEffect } from "react";
import { FilterOptions, SortOption, ContentType } from "@/lib/types";

interface DataFilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  currentFilters: FilterOptions;
  currentSort: SortOption;
}

const DataFilterBar = ({ onFilterChange, onSortChange, currentFilters, currentSort }: DataFilterBarProps) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentFilters.searchQuery || "");
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>(currentFilters.types || []);
  const [dateFrom, setDateFrom] = useState(currentFilters.dateFrom || "");
  const [dateTo, setDateTo] = useState(currentFilters.dateTo || "");
  
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    applyFilters({ ...currentFilters, searchQuery: e.target.value });
  };

  // Handle content type checkbox changes
  const handleTypeChange = (type: ContentType, checked: boolean) => {
    let newTypes: ContentType[];
    
    if (checked) {
      newTypes = [...selectedTypes, type];
    } else {
      newTypes = selectedTypes.filter(t => t !== type);
    }
    
    setSelectedTypes(newTypes);
  };

  // Apply filters
  const applyFilters = (filters: FilterOptions) => {
    onFilterChange(filters);
  };

  // Apply all current filter values
  const handleApplyFilters = () => {
    const newFilters: FilterOptions = {
      types: selectedTypes,
      searchQuery,
      dateFrom,
      dateTo
    };
    
    applyFilters(newFilters);
    setFilterDropdownOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      {/* SearchBar Component */}
      <div className="relative w-full sm:w-64">
        <input 
          type="text" 
          placeholder="Search data..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="absolute right-2 top-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Filter Button */}
      <div className="relative" ref={filterDropdownRef}>
        <button 
          className="px-4 py-2 bg-[#F5F5F5] text-[#2D2D2D] rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filters
        </button>
        
        {/* Filter Dropdown */}
        {filterDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10 w-48">
            <div className="px-3 py-2 border-b border-gray-100">
              <h4 className="font-medium text-sm">Content Type</h4>
              <div className="mt-1 space-y-1">
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('article')}
                    onChange={(e) => handleTypeChange('article', e.target.checked)}
                  /> 
                  Articles
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('image')}
                    onChange={(e) => handleTypeChange('image', e.target.checked)}
                  /> 
                  Images
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('product')}
                    onChange={(e) => handleTypeChange('product', e.target.checked)}
                  /> 
                  Products
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('news')}
                    onChange={(e) => handleTypeChange('news', e.target.checked)}
                  /> 
                  News
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('social')}
                    onChange={(e) => handleTypeChange('social', e.target.checked)}
                  /> 
                  Social
                </label>
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded"
                    checked={selectedTypes.includes('review')}
                    onChange={(e) => handleTypeChange('review', e.target.checked)}
                  /> 
                  Reviews
                </label>
              </div>
            </div>
            <div className="px-3 py-2 border-b border-gray-100">
              <h4 className="font-medium text-sm">Date Range</h4>
              <div className="mt-1 space-y-2">
                <input 
                  type="date" 
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
                <input 
                  type="date" 
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <div className="px-3 py-2">
              <button 
                className="w-full py-1 bg-[#007AFF] text-white rounded-md text-sm hover:bg-blue-600"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Sort Dropdown */}
      <div className="relative">
        <select 
          className="appearance-none px-4 py-2 bg-[#F5F5F5] text-[#2D2D2D] rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#007AFF] pr-8"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DataFilterBar;
