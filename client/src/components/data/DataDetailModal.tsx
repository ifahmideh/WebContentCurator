import { useEffect, useRef } from "react";
import { Content } from "@/lib/types";

interface DataDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: Content | null;
}

const DataDetailModal = ({ isOpen, onClose, content }: DataDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = ""; // Restore scrolling
    };
  }, [isOpen, onClose]);

  // Handle click outside of modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get appropriate badge color for content type
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

  // Format content type for display
  const formatContentType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Helper function to copy content to clipboard
  const copyToClipboard = () => {
    if (!content) return;
    
    let textToCopy = "";
    
    switch (content.type) {
      case 'article':
      case 'news':
        textToCopy = `${content.title}\n\n${content.content}`;
        break;
      case 'image':
        textToCopy = `${content.title}\nResolution: ${content.resolution}\nFormat: ${content.format}`;
        break;
      case 'product':
        textToCopy = `${content.title}\nPrice: ${content.price}\n\n${content.description}`;
        break;
      case 'social':
        textToCopy = `${content.username} (${content.handle}):\n${content.content}`;
        break;
      case 'review':
        textToCopy = `${content.title}\nRating: ${content.rating}/5\n\n${content.content}\n\nReviewer: ${content.reviewer}`;
        break;
      default:
        textToCopy = content.title;
    }
    
    navigator.clipboard.writeText(textToCopy)
      .catch(err => console.error('Could not copy text: ', err));
  };

  // Render article content
  const renderArticleContent = (content: Content) => {
    if (content.type !== 'article' && content.type !== 'news') return null;
    
    return (
      <div className="modal-content-section max-w-reading mx-auto">
        <p className="text-gray-600 mb-4">{content.content}</p>
      </div>
    );
  };

  // Render image content
  const renderImageContent = (content: Content) => {
    if (content.type !== 'image') return null;
    
    return (
      <div className="modal-content-section">
        <div className="max-w-3xl mx-auto">
          <div className="w-full h-64 rounded-lg shadow-md bg-[#F5F5F5] flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">{content.title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Dimensions:</span> {content.resolution}</p>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Format:</span> {content.format}</p>
                {content.fileSize && (
                  <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Size:</span> {content.fileSize}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Source:</span> <a href="#" className="text-[#007AFF] hover:underline">{content.source}</a></p>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Date Scraped:</span> {content.timestamp}</p>
                {content.license && (
                  <p className="text-sm text-gray-600 mb-1"><span className="font-medium">License:</span> {content.license}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render product content
  const renderProductContent = (content: Content) => {
    if (content.type !== 'product') return null;
    
    return (
      <div className="modal-content-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="w-full h-64 rounded-lg shadow-md bg-[#F5F5F5] flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-xl mb-2">{content.title}</h4>
            <p className="text-[#007AFF] font-medium text-2xl mb-3">{content.price}</p>
            <div className="flex items-center mb-4">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={i < Math.floor(content.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">{content.rating}/5 ({content.reviewCount} reviews)</span>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium mb-2">Product Description:</h5>
              <p className="text-gray-600 text-sm">{content.description}</p>
            </div>
            
            <div className="mb-4">
              <h5 className="font-medium mb-2">Specifications:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {content.specifications.map((spec, index) => (
                  <li key={index}>• {spec}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-sm text-gray-600"><span className="font-medium">Source:</span> <a href="#" className="text-[#007AFF] hover:underline">{content.source}</a></p>
              <p className="text-sm text-gray-600"><span className="font-medium">Date Scraped:</span> {content.timestamp}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render social content
  const renderSocialContent = (content: Content) => {
    if (content.type !== 'social') return null;
    
    return (
      <div className="modal-content-section max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="font-medium">{content.username}</p>
            <p className="text-sm text-gray-500">{content.handle}</p>
          </div>
        </div>
        <div className="text-gray-600 mb-4 text-lg">
          {content.content}
        </div>
        <div className="flex items-center text-gray-500 border-t border-gray-200 pt-4 mt-4">
          <span className="mr-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {content.likes} Likes
          </span>
          <span className="mr-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {content.comments} Comments
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {content.shares} Shares
          </span>
        </div>
      </div>
    );
  };

  // Render review content
  const renderReviewContent = (content: Content) => {
    if (content.type !== 'review') return null;
    
    return (
      <div className="modal-content-section max-w-2xl mx-auto">
        <div className="mb-4 flex items-center">
          <div className="flex text-amber-400 mr-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill={i < Math.floor(content.rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-lg font-medium">{content.rating.toFixed(1)} / 5.0</span>
        </div>
        <h4 className="text-xl font-medium mb-3">{content.title}</h4>
        <div className="text-gray-600 mb-6 whitespace-pre-line">
          {content.content}
        </div>
        <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
          <p><span className="font-medium">Reviewer:</span> {content.reviewer}</p>
          <p><span className="font-medium">Date:</span> {content.timestamp}</p>
        </div>
      </div>
    );
  };

  if (!isOpen || !content) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <span className={`inline-block px-2 py-1 text-xs font-medium ${getTypeColor(content.type)} rounded-full mr-3`}>
              {formatContentType(content.type)}
            </span>
            <h3 className="text-lg font-medium text-[#2D2D2D]">{content.title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {renderArticleContent(content)}
          {renderImageContent(content)}
          {renderProductContent(content)}
          {renderSocialContent(content)}
          {renderReviewContent(content)}
        </div>
        
        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">
              Scraped from <a href="#" className="text-[#007AFF] hover:underline">{content.source}</a> on {content.timestamp}
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 bg-[#F5F5F5] text-[#2D2D2D] rounded hover:bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
              onClick={copyToClipboard}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
            <button 
              className="px-3 py-1 bg-[#F5F5F5] text-[#2D2D2D] rounded hover:bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button 
              className="px-3 py-1 bg-[#F5F5F5] text-[#2D2D2D] rounded hover:bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDetailModal;
