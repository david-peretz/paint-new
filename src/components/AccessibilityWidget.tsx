import React, { useState } from 'react';
import { 
  Eye, 
  Type, 
  MousePointer, 
  Contrast, 
  X,
  AccessibilityIcon
} from 'lucide-react';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 90) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}%`;
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleBigCursor = () => {
    setBigCursor(!bigCursor);
    document.documentElement.classList.toggle('big-cursor');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-2 border border-gray-200 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">נגישות</span>
              <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Type className="w-5 h-5 ml-2" />
                  גודל טקסט
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={decreaseFontSize}
                    className="bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 text-sm"
                  >
                    א-
                  </button>
                  <button
                    onClick={increaseFontSize}
                    className="bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 text-sm"
                  >
                    א+
                  </button>
                </div>
              </div>

              <button
                onClick={toggleHighContrast}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  highContrast ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <Contrast className="w-5 h-5 ml-2" />
                  ניגודיות גבוהה
                </span>
                <span className={`w-4 h-4 rounded-full ${highContrast ? 'bg-blue-600' : 'bg-gray-300'}`} />
              </button>

              <button
                onClick={toggleBigCursor}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  bigCursor ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center">
                  <MousePointer className="w-5 h-5 ml-2" />
                  סמן מוגדל
                </span>
                <span className={`w-4 h-4 rounded-full ${bigCursor ? 'bg-blue-600' : 'bg-gray-300'}`} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="פתח תפריט נגישות"
      >
        <AccessibilityIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AccessibilityWidget;