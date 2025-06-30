export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface EditingCell {
  rowIndex: number;
  field: 'description' | 'amount' | 'date';
}

export interface AppSettings {
  darkMode: boolean;
}

export interface UndoAction {
  type: 'delete' | 'update' | 'add';
  expense: Expense;
  previousValue?: Partial<Expense>;
  timestamp: number;
}