import React from 'react';
import { X, Smartphone, Database, Zap, Code, Download, Trash2, Moon, Sun, Undo } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
  onExportCsv: () => void;
  onUndo: () => void;
  canUndo: boolean;
  expenseCount: number;
}

export const InfoModal: React.FC<InfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onClearAll, 
  onExportCsv, 
  onUndo,
  canUndo,
  expenseCount 
}) => {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all expenses? This action can be undone.')) {
      onClearAll();
    }
  };

  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">About PocketLog</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Zap size={16} className="text-emerald-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Undo size={14} />
                Undo
              </button>
              <button
                onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {settings.darkMode ? <Sun size={14} /> : <Moon size={14} />}
                {settings.darkMode ? 'Light' : 'Dark'}
              </button>
              <button
                onClick={onExportCsv}
                disabled={expenseCount === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={14} />
                Export CSV
              </button>
              <button
                onClick={handleClearAll}
                disabled={expenseCount === 0}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Smartphone size={16} className="text-emerald-600" />
              What is PocketLog?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A simple, Excel-like expense tracker designed for quick mobile entry. 
              Tap any cell to edit, use your keyboard's "Next" button to navigate between fields, 
              and delete items by clearing both description and amount or using swipe gestures.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Database size={16} className="text-emerald-600" />
              Features
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Excel-style spreadsheet interface</li>
              <li>• Quick tap-to-edit functionality</li>
              <li>• Editable dates for each expense</li>
              <li>• Swipe-to-delete on mobile</li>
              <li>• Undo/redo functionality</li>
              <li>• Dark mode support</li>
              <li>• CSV export for backup</li>
              <li>• Haptic feedback on mobile</li>
              <li>• Automatic data persistence</li>
              <li>• PWA - install on your device</li>
              <li>• Works offline</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Code size={16} className="text-emerald-600" />
              Tech Stack
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• React 18 with TypeScript</li>
              <li>• Tailwind CSS with dark mode</li>
              <li>• Vite for build tooling</li>
              <li>• PWA with service worker</li>
              <li>• Local storage for data</li>
              <li>• Lucide React for icons</li>
              <li>• Touch gestures & haptic feedback</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Zap size={16} className="text-emerald-600" />
              Keyboard Shortcuts
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> or <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</kbd> - Save and move to next cell</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Escape</kbd> - Cancel editing</li>
              <li>• Swipe left on mobile to delete</li>
              <li>• Clear both fields to delete an expense</li>
            </ul>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              📊 <strong>{currentMonth}:</strong> {expenseCount} expense{expenseCount !== 1 ? 's' : ''} tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};