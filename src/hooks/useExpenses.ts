import { useState, useEffect } from 'react';
import { Expense, UndoAction } from '../types/expense';

const STORAGE_KEY = 'pocketlog-data';
const UNDO_KEY = 'pocketlog-undo';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [undoStack, setUndoStack] = useState<UndoAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedExpenses = JSON.parse(saved);
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Failed to parse saved expenses:', error);
      }
    }

    const savedUndo = localStorage.getItem(UNDO_KEY);
    if (savedUndo) {
      try {
        const parsedUndo = JSON.parse(savedUndo);
        setUndoStack(parsedUndo);
      } catch (error) {
        console.error('Failed to parse undo stack:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(UNDO_KEY, JSON.stringify(undoStack));
  }, [undoStack]);

  const addToUndoStack = (action: UndoAction) => {
    setUndoStack(prev => [...prev.slice(-9), action]); // Keep last 10 actions
  };

  const addExpense = async (description: string, amount: number, date: string) => {
    setIsLoading(true);
    
    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount,
      date
    };
    
    setExpenses(prev => [...prev, newExpense]);
    addToUndoStack({
      type: 'add',
      expense: newExpense,
      timestamp: Date.now()
    });
    
    setIsLoading(false);
    
    // Haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    setIsLoading(true);
    
    const oldExpense = expenses.find(e => e.id === id);
    if (oldExpense) {
      addToUndoStack({
        type: 'update',
        expense: oldExpense,
        previousValue: updates,
        timestamp: Date.now()
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...updates } : expense
    ));
    
    setIsLoading(false);
    
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const deleteExpense = async (id: string) => {
    setIsLoading(true);
    
    const expenseToDelete = expenses.find(e => e.id === id);
    if (expenseToDelete) {
      addToUndoStack({
        type: 'delete',
        expense: expenseToDelete,
        timestamp: Date.now()
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    
    setIsLoading(false);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  };

  const undo = () => {
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;

    setUndoStack(prev => prev.slice(0, -1));

    switch (lastAction.type) {
      case 'add':
        setExpenses(prev => prev.filter(e => e.id !== lastAction.expense.id));
        break;
      case 'delete':
        setExpenses(prev => [...prev, lastAction.expense]);
        break;
      case 'update':
        if (lastAction.previousValue) {
          setExpenses(prev => prev.map(e => 
            e.id === lastAction.expense.id ? lastAction.expense : e
          ));
        }
        break;
    }

    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const clearAll = () => {
    if (expenses.length > 0) {
      // Add all expenses to undo stack as one action
      expenses.forEach(expense => {
        addToUndoStack({
          type: 'delete',
          expense,
          timestamp: Date.now()
        });
      });
      setExpenses([]);
    }
  };

  const exportToCsv = () => {
    if (expenses.length === 0) return;

    const headers = ['Date', 'Description', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        `"${expense.description.replace(/"/g, '""')}"`,
        expense.amount.toFixed(2)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pocketlog-expenses-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const canUndo = undoStack.length > 0;

  return {
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
  };
};