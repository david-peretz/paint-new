import React from 'react';
import { Moon, Sun, Star } from 'lucide-react';

const ShabbatMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <Star className="absolute top-10 left-10 w-6 h-6 text-yellow-200 opacity-50" />
          <Star className="absolute top-20 right-20 w-4 h-4 text-yellow-200 opacity-30" />
          <Star className="absolute bottom-20 left-1/4 w-5 h-5 text-yellow-200 opacity-40" />
          <Moon className="absolute top-5 right-5 w-12 h-12 text-yellow-100 opacity-20" />
          <Sun className="absolute bottom-5 left-5 w-10 h-10 text-orange-200 opacity-20" />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            שבת שלום ומבורך
          </h1>
          
          <div className="text-xl text-gray-200 mb-8 leading-relaxed">
            <p>האתר סגור לכבוד השבת</p>
            <p>נשמח לעמוד לשירותכם במוצאי שבת</p>
          </div>
          
          <div className="text-lg text-gray-300">
            <p>זמני כניסת השבת: יום שישי 17:00</p>
            <p>זמני יציאת השבת: מוצ"ש 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShabbatMessage;