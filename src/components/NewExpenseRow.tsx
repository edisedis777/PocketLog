import React, { useState, useEffect } from 'react';
import { ExpenseCell } from './ExpenseCell';
import { EditingCell } from '../types/expense';

interface NewExpenseRowProps {
  onAdd: (description: string, amount: number, date: string) => void;
  editingCell: EditingCell | null;
  onCellEdit: (field: 'description' | 'amount' | 'date') => void;
  onCancel: () => void;
  rowIndex: number;
  autoFocus?: boolean;
}

export const NewExpenseRow: React.FC<NewExpenseRowProps> = ({
  onAdd,
  editingCell,
  onCellEdit,
  onCancel,
  rowIndex,
  autoFocus = false
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const isEditingDescription = editingCell?.rowIndex === rowIndex && editingCell?.field === 'description';
  const isEditingAmount = editingCell?.rowIndex === rowIndex && editingCell?.field === 'amount';
  const isEditingDate = editingCell?.rowIndex === rowIndex && editingCell?.field === 'date';

  // Auto-focus description field when component mounts
  useEffect(() => {
    if (autoFocus && !editingCell) {
      onCellEdit('description');
    }
  }, [autoFocus, editingCell, onCellEdit]);

  const handleSave = (field: 'description' | 'amount' | 'date', value: string | number) => {
    if (field === 'description') {
      setDescription(value.toString());
    } else if (field === 'amount') {
      setAmount(Number(value));
    } else if (field === 'date') {
      setDate(value.toString());
    }

    // Auto-save when both description and amount have values
    const newDescription = field === 'description' ? value.toString() : description;
    const newAmount = field === 'amount' ? Number(value) : amount;
    const newDate = field === 'date' ? value.toString() : date;
    
    if (newDescription.trim() && newAmount > 0) {
      onAdd(newDescription, newAmount, newDate);
      setDescription('');
      setAmount(0);
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleNext = (currentField: 'description' | 'amount' | 'date') => {
    if (currentField === 'description') {
      onCellEdit('amount');
    } else if (currentField === 'amount') {
      onCellEdit('date');
    } else {
      // Move to description of next row
      onCellEdit('description');
    }
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/20">
      <td className="border-r border-gray-200 dark:border-gray-700 bg-emerald-100 dark:bg-emerald-800/30 text-center py-2 px-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
        +
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={description}
          type="text"
          isEditing={isEditingDescription}
          onEdit={() => onCellEdit('description')}
          onSave={(value) => handleSave('description', value)}
          onNext={() => handleNext('description')}
          onCancel={onCancel}
          placeholder="Enter description..."
          autoFocus={autoFocus}
        />
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={amount}
          type="number"
          isEditing={isEditingAmount}
          onEdit={() => onCellEdit('amount')}
          onSave={(value) => handleSave('amount', value)}
          onNext={() => handleNext('amount')}
          onCancel={onCancel}
          placeholder="0.00"
        />
      </td>
      <td className="border-r border-gray-200 dark:border-gray-700">
        <ExpenseCell
          value={date}
          type="date"
          isEditing={isEditingDate}
          onEdit={() => onCellEdit('date')}
          onSave={(value) => handleSave('date', value)}
          onNext={() => handleNext('date')}
          onCancel={onCancel}
          placeholder="Select date..."
        />
      </td>
    </tr>
  );
};