import React from 'react';
import { Trash2 } from 'lucide-react';
import { Expense, EditingCell } from '../types/expense';
import { ExpenseCell } from './ExpenseCell';

interface ExpenseRowProps {
  expense: Expense;
  index: number;
  editingCell: EditingCell | null;
  onCellEdit: (rowIndex: number, field: 'description' | 'amount' | 'date') => void;
  onCellSave: (rowIndex: number, field: 'description' | 'amount' | 'date', value: string | number) => void;
  onNext: (currentRow: number, currentField: 'description' | 'amount' | 'date') => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const ExpenseRow: React.FC<ExpenseRowProps> = ({
  expense,
  index,
  editingCell,
  onCellEdit,
  onCellSave,
  onNext,
  onCancel,
  onDelete
}) => {
  const isEditingDescription = editingCell?.rowIndex === index && editingCell?.field === 'description';
  const isEditingAmount = editingCell?.rowIndex === index && editingCell?.field === 'amount';
  const isEditingDate = editingCell?.rowIndex === index && editingCell?.field === 'date';

  const handleSwipeDelete = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0];
      const deltaX = startX - currentTouch.clientX;
      
      if (deltaX > 100) { // Swipe left threshold
        onDelete(expense.id);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <tr 
      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors"
      onTouchStart={handleSwipeDelete}
    >
      <td className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center py-2 px-2 text-sm text-gray-600 dark:text-gray-400 font-medium relative">
        {index + 1}
        <button
          onClick={() => onDelete(expense.id)}
          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          title="Delete expense"
        >
          <Trash2 size={12} className="text-red-500" />
        </button>
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={expense.description}
          type="text"
          isEditing={isEditingDescription}
          onEdit={() => onCellEdit(index, 'description')}
          onSave={(value) => onCellSave(index, 'description', value)}
          onNext={() => onNext(index, 'description')}
          onCancel={onCancel}
          placeholder="Enter description..."
        />
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={expense.amount}
          type="number"
          isEditing={isEditingAmount}
          onEdit={() => onCellEdit(index, 'amount')}
          onSave={(value) => onCellSave(index, 'amount', value)}
          onNext={() => onNext(index, 'amount')}
          onCancel={onCancel}
          placeholder="0.00"
        />
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={expense.date}
          type="date"
          isEditing={isEditingDate}
          onEdit={() => onCellEdit(index, 'date')}
          onSave={(value) => onCellSave(index, 'date', value)}
          onNext={() => onNext(index, 'date')}
          onCancel={onCancel}
          placeholder="Select date..."
        />
      </td>
    </tr>
  );
};