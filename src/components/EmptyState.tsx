import React from 'react';
import { PlusCircle, Calculator } from 'lucide-react';

interface EmptyStateProps {
  onStartAdding: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onStartAdding }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
        <Calculator className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Start tracking your expenses
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        Tap the button below or click on any cell in the spreadsheet to add your first expense.
      </p>
      <button
        onClick={onStartAdding}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        <PlusCircle size={16} />
        Add First Expense
      </button>
    </div>
  );
};