import React, { useState, useEffect } from 'react';
import { Info, Calculator, Undo } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { useSettings } from './hooks/useSettings';
import { ExpenseRow } from './components/ExpenseRow';
import { NewExpenseRow } from './components/NewExpenseRow';
import { InfoModal } from './components/InfoModal';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SuccessIndicator } from './components/SuccessIndicator';
import { EditingCell } from './types/expense';

function App() {
  const { 
    expenses, 
    addExpense, 
    updateExpense, 
    deleteExpense, 
    undo, 
    canUndo, 
    clearAll, 
    exportToCsv, 
    total, 
    isLoading 
  } = useExpenses();
  
  const { settings } = useSettings();
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const handleCellEdit = (rowIndex: number, field: 'description' | 'amount' | 'date') => {
    setEditingCell({ rowIndex, field });
  };

  const handleNewRowCellEdit = (field: 'description' | 'amount' | 'date') => {
    setEditingCell({ rowIndex: expenses.length, field });
  };

  const handleCellSave = async (rowIndex: number, field: 'description' | 'amount' | 'date', value: string | number) => {
    const expense = expenses[rowIndex];
    
    const updates = {
      [field]: field === 'amount' ? Number(value) : value.toString()
    };
    
    // Check if both description and amount are empty after update
    const newDescription = field === 'description' ? value.toString() : expense.description;
    const newAmount = field === 'amount' ? Number(value) : expense.amount;
    
    if (!newDescription.trim() && newAmount === 0) {
      await deleteExpense(expense.id);
      showSuccessMessage('Expense deleted');
    } else {
      await updateExpense(expense.id, updates);
      showSuccessMessage('Expense updated');
    }
    
    setEditingCell(null);
  };

  const handleAddExpense = async (description: string, amount: number, date: string) => {
    await addExpense(description, amount, date);
    showSuccessMessage('Expense added');
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);
    showSuccessMessage('Expense deleted');
  };

  const handleUndo = () => {
    undo();
    showSuccessMessage('Action undone');
  };

  const handleClearAll = () => {
    clearAll();
    showSuccessMessage('All expenses cleared');
  };

  const handleExportCsv = () => {
    exportToCsv();
    showSuccessMessage('CSV exported');
  };

  const handleNext = (currentRow: number, currentField: 'description' | 'amount' | 'date') => {
    if (currentField === 'description') {
      setEditingCell({ rowIndex: currentRow, field: 'amount' });
    } else if (currentField === 'amount') {
      setEditingCell({ rowIndex: currentRow, field: 'date' });
    } else {
      // Move to next row's description
      if (currentRow < expenses.length - 1) {
        setEditingCell({ rowIndex: currentRow + 1, field: 'description' });
      } else {
        // Move to new expense row
        setEditingCell({ rowIndex: expenses.length, field: 'description' });
      }
    }
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const handleStartAdding = () => {
    setEditingCell({ rowIndex: expenses.length, field: 'description' });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not editing
      if (editingCell) return;
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (canUndo) {
          handleUndo();
        }
      }
      
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleStartAdding();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editingCell, canUndo]);

  return (
    <div className={`min-h-screen transition-colors ${
      settings.darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="text-emerald-600 dark:text-emerald-400" size={24} />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">PocketLog</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{currentMonth}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canUndo && (
                <button
                  onClick={handleUndo}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  title="Undo last action (Ctrl+Z)"
                >
                  <Undo className="text-gray-600 dark:text-gray-400" size={20} />
                </button>
              )}
              <button
                onClick={() => setShowInfo(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="App information"
              >
                <Info className="text-gray-600 dark:text-gray-400" size={20} />
              </button>
              {isLoading && (
                <LoadingSpinner size="sm" className="text-emerald-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        {expenses.length === 0 && !editingCell ? (
          <EmptyState onStartAdding={handleStartAdding} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
            {/* Spreadsheet Header */}
            <div className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-12 px-2 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-600">
                        #
                      </th>
                      <th className="px-2 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-left border-r border-gray-300 dark:border-gray-600 min-w-[200px]">
                        DESCRIPTION
                      </th>
                      <th className="px-2 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-left border-r border-gray-300 dark:border-gray-600 min-w-[120px]">
                        AMOUNT
                      </th>
                      <th className="px-2 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 text-left min-w-[120px]">
                        DATE
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            {/* Spreadsheet Body */}
            <div className="overflow-x-auto max-h-[calc(100vh-250px)] overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {expenses.map((expense, index) => (
                    <ExpenseRow
                      key={expense.id}
                      expense={expense}
                      index={index}
                      editingCell={editingCell}
                      onCellEdit={handleCellEdit}
                      onCellSave={handleCellSave}
                      onNext={handleNext}
                      onCancel={handleCancel}
                      onDelete={handleDeleteExpense}
                    />
                  ))}
                  <NewExpenseRow
                    onAdd={handleAddExpense}
                    editingCell={editingCell}
                    onCellEdit={handleNewRowCellEdit}
                    onCancel={handleCancel}
                    rowIndex={expenses.length}
                    autoFocus={expenses.length === 0}
                  />
                  {/* Empty rows for Excel-like appearance */}
                  {Array.from({ length: Math.max(5, 10 - expenses.length) }, (_, i) => (
                    <tr key={`empty-${i}`} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center py-2 px-2 text-sm text-gray-400 dark:text-gray-500">
                        {expenses.length + i + 2}
                      </td>
                      <td className="border-r border-gray-200 dark:border-gray-700 py-2 px-2 h-9"></td>
                      <td className="border-r border-gray-200 dark:border-gray-700 py-2 px-2 h-9"></td>
                      <td className="border-r border-gray-200 dark:border-gray-700 py-2 px-2 h-9"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Footer */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border-t-2 border-emerald-200 dark:border-emerald-700 p-4 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Total Expenses ({expenses.length} item{expenses.length !== 1 ? 's' : ''})
                </span>
                <span className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Instructions */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 lg:hidden transition-colors">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💡 <strong>Quick tip:</strong> Tap any cell to edit, swipe left to delete, use "Next" to move between fields.
          </p>
        </div>
      </div>

      <InfoModal 
        isOpen={showInfo} 
        onClose={() => setShowInfo(false)}
        onClearAll={handleClearAll}
        onExportCsv={handleExportCsv}
        onUndo={handleUndo}
        canUndo={canUndo}
        expenseCount={expenses.length}
      />

      <SuccessIndicator
        show={showSuccess}
        message={successMessage}
        onHide={() => setShowSuccess(false)}
      />
    </div>
  );
}

export default App;