import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface VirtualControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const VirtualControls: React.FC<VirtualControlsProps> = ({ onMove }) => {
  const buttonClass = "bg-white bg-opacity-90 hover:bg-opacity-100 rounded-2xl shadow-lg p-4 active:scale-95 transition-all duration-150 touch-manipulation";

  return (
    <div className="fixed bottom-8 right-8 md:hidden">
      <div className="grid grid-cols-3 gap-2 w-40">
        {/* Top row */}
        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('up')}
          onClick={() => onMove('up')}
        >
          <ArrowUp className="w-6 h-6 text-gray-700" />
        </button>
        <div></div>
        
        {/* Middle row */}
        <button
          className={buttonClass}
          onTouchStart={() => onMove('left')}
          onClick={() => onMove('left')}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('right')}
          onClick={() => onMove('right')}
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </button>
        
        {/* Bottom row */}
        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('down')}
          onClick={() => onMove('down')}
        >
          <ArrowDown className="w-6 h-6 text-gray-700" />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default VirtualControls;