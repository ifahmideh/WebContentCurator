import { Content } from "@/lib/types";

interface DataItemProps {
  item: Content;
  onClick: (item: Content) => void;
}

const DataItem = ({ item, onClick }: DataItemProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'image': return 'bg-green-100 text-green-700';
      case 'product': return 'bg-purple-100 text-purple-700';
      case 'news': return 'bg-red-100 text-red-700';
      case 'social': return 'bg-yellow-100 text-yellow-700';
      case 'review': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderContent = () => {
    switch (item.type) {
      case 'article':
        return (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>Article</span>
              <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
            </div>
            <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>
            <div className="mt-3 text-xs text-gray-500">
              Source: <a href="#" className="text-[#007AFF] hover:underline">{item.source}</a>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <>
            <div className="h-48 bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>Image</span>
                <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>Resolution: {item.resolution}</span>
                <span>Format: {item.format}</span>
              </div>
            </div>
          </>
        );
      
      case 'product':
        return (
          <>
            <div className="h-48 bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>Product</span>
                <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
              <h3 className="font-medium mb-1">{item.title}</h3>
              <p className="text-[#007AFF] font-medium">{item.price}</p>
              <div className="mt-2 flex items-center">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({item.reviewCount} reviews)</span>
              </div>
            </div>
          </>
        );
      
      case 'news':
        return (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>News</span>
              <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
            </div>
            <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>
            <div className="mt-3 text-xs text-gray-500">
              Source: <a href="#" className="text-[#007AFF] hover:underline">{item.source}</a>
            </div>
          </div>
        );
      
      case 'social':
        return (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>Social</span>
              <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{item.username}</p>
                <p className="text-xs text-gray-500">{item.handle}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{item.content}</p>
            <div className="mt-3 text-xs flex items-center text-gray-500">
              <span className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {item.likes}
              </span>
              <span className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {item.comments}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {item.shares}
              </span>
            </div>
          </div>
        );
      
      case 'review':
        return (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(item.type)} rounded-full mb-2`}>Review</span>
              <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
            </div>
            <div className="mb-2 flex items-center">
              <div className="flex text-amber-400 mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">{item.rating.toFixed(1)} / 5.0</span>
            </div>
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{item.content}</p>
            <div className="mt-3 text-xs text-gray-500">
              Reviewer: <span className="font-medium">{item.reviewer}</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-4">
            <div className="flex items-start justify-between">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-2">Unknown</span>
              <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
            </div>
            <h3 className="font-medium mb-2">{item.title}</h3>
            <div className="mt-3 text-xs text-gray-500">
              Source: <span>{item.source}</span>
            </div>
          </div>
        );
    }
  };

  // Helper function to format timestamp to relative time
  const formatTime = (timestamp: string) => {
    return timestamp; // In a real app, would use a library like date-fns
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden cursor-pointer"
      onClick={() => onClick(item)}
    >
      {renderContent()}
    </div>
  );
};

export default DataItem;
