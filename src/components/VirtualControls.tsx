import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface VirtualControlsProps {
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const buttonClass =
  "bg-white bg-opacity-90 hover:bg-opacity-100 rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center active:scale-90 active:opacity-80 transition-all duration-150 touch-manipulation";

const iconClass = "w-7 h-7 text-gray-700";

const VirtualControls: React.FC<VirtualControlsProps> = ({ onMove }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:hidden z-50">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-48 h-48">
        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('up')}
          onClick={() => onMove('up')}
          aria-label="Atas"
        >
          <ArrowUp className={iconClass} />
        </button>
        <div></div>

        <button
          className={buttonClass}
          onTouchStart={() => onMove('left')}
          onClick={() => onMove('left')}
          aria-label="Kiri"
        >
          <ArrowLeft className={iconClass} />
        </button>
        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('right')}
          onClick={() => onMove('right')}
          aria-label="Kanan"
        >
          <ArrowRight className={iconClass} />
        </button>

        <div></div>
        <button
          className={buttonClass}
          onTouchStart={() => onMove('down')}
          onClick={() => onMove('down')}
          aria-label="Bawah"
        >
          <ArrowDown className={iconClass} />
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default VirtualControls;