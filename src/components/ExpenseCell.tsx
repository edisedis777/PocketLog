import React, { useState, useEffect, useRef } from 'react';

interface ExpenseCellProps {
  value: string | number;
  type: 'text' | 'number' | 'date';
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string | number) => void;
  onNext?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const ExpenseCell: React.FC<ExpenseCellProps> = ({
  value,
  type,
  isEditing,
  onEdit,
  onSave,
  onNext,
  onCancel,
  placeholder,
  autoFocus = false
}) => {
  const [editValue, setEditValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (autoFocus) {
        inputRef.current.select();
      }
    }
  }, [isEditing, autoFocus]);

  useEffect(() => {
    setEditValue(value.toString());
  }, [value]);

  const handleSave = () => {
    if (type === 'number') {
      const numValue = parseFloat(editValue) || 0;
      onSave(numValue);
    } else {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
      if (onNext) {
        onNext();
      }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      handleSave();
      if (onNext) {
        onNext();
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditValue(value.toString());
      if (onCancel) {
        onCancel();
      }
    }
  };

  const getDisplayValue = () => {
    if (type === 'number' && value !== 0) {
      return `$${parseFloat(value.toString()).toFixed(2)}`;
    }
    if (type === 'date' && value) {
      return new Date(value.toString()).toLocaleDateString();
    }
    return value.toString();
  };

  const displayValue = getDisplayValue();

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full h-full px-2 py-1 text-sm border-2 border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none rounded transition-colors placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder}
        step={type === 'number' ? '0.01' : undefined}
        min={type === 'number' ? '0' : undefined}
        inputMode={type === 'number' ? 'decimal' : type === 'date' ? 'none' : 'text'}
      />
    );
  }

  return (
    <div
      onClick={onEdit}
      className="w-full h-full px-2 py-1 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center min-h-[36px] active:bg-gray-100 dark:active:bg-gray-600 text-gray-900 dark:text-white"
    >
      {displayValue || (
        <span className="text-gray-400 dark:text-gray-500 italic">{placeholder}</span>
      )}
    </div>
  );
};