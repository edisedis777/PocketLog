import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface SuccessIndicatorProps {
  show: boolean;
  message: string;
  onHide: () => void;
}

export const SuccessIndicator: React.FC<SuccessIndicatorProps> = ({
  show,
  message,
  onHide
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onHide, 300); // Wait for fade out
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show && !isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <Check size={16} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};