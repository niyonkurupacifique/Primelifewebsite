'use client';

import React, { useRef, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const MyPolicies: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  useEffect(() => {
    // Check if iframe is blocked after a timeout
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIframeBlocked(true);
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const injectBreakoutScript = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const script = `
          if (top.location != self.location) {
            top.location = self.location;
          }
        `;
        
        const iframeDoc = iframeRef.current.contentWindow.document;
        const scriptElement = iframeDoc.createElement('script');
        scriptElement.textContent = script;
        iframeDoc.head.appendChild(scriptElement);
      } catch (error) {
        console.log('Cross-origin restrictions prevent script injection');
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    injectBreakoutScript();
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open('https://apps.prime.rw/family/PolicyView', '_blank');
  };

  const openInSameTab = () => {
    window.location.href = 'https://apps.prime.rw/family/PolicyView';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">
            My Policies
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {isLoading && !iframeBlocked && (
              <div className="w-full h-[800px] flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading policy viewer...</p>
                </div>
              </div>
            )}
            
            {(iframeError || iframeBlocked) && (
              <div className="w-full h-[800px] flex items-center justify-center bg-gray-100">
                <div className="text-center max-w-md mx-auto">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Policy Viewer Access
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {iframeBlocked 
                      ? "The policy viewer is taking longer than expected to load, or may be blocked by security policies."
                      : "The policy viewer cannot be embedded due to security restrictions."
                    }
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={openInNewTab}
                      className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Open in New Tab
                    </button>
                    <button
                      onClick={openInSameTab}
                      className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Open in Same Tab
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    You can also manually visit: <br />
                    <a 
                      href="https://apps.prime.rw/family/PolicyView" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      https://apps.prime.rw/family/PolicyView
                    </a>
                  </p>
                </div>
              </div>
            )}
            
            <iframe
              ref={iframeRef}
              src="https://apps.prime.rw/family/PolicyView"
              title="My Policies"
              className="w-full h-[800px] border-0"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
              allow="fullscreen"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ display: (iframeError || iframeBlocked) ? 'none' : 'block' }}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyPolicies;