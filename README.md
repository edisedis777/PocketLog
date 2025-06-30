# PocketLog 📊

A beautiful, Excel-like expense tracking Progressive Web App (PWA) designed for quick mobile entry and seamless expense management. Built with modern web technologies and optimized for both desktop and mobile experiences.

![PocketLog Screenshot](https://via.placeholder.com/800x400/10B981/ffffff?text=PocketLog+Expense+Tracker)

## ✨ Features

### 📱 **Mobile-First Design**
- **Excel-style spreadsheet interface** - Familiar grid layout for easy data entry
- **Tap-to-edit functionality** - Click any cell to start editing instantly
- **Touch-optimized navigation** - Smooth transitions between fields
- **Swipe-to-delete gestures** - Swipe left on mobile to delete expenses
- **Haptic feedback** - Tactile responses for better user experience

### 🎨 **Beautiful User Experience**
- **Dark mode support** - Automatic system preference detection with manual toggle
- **Responsive design** - Optimized for all screen sizes from mobile to desktop
- **Smooth animations** - Polished micro-interactions and transitions
- **Success indicators** - Visual feedback for all actions
- **Loading states** - Elegant loading spinners for better perceived performance

### 💾 **Data Management**
- **Automatic persistence** - All data saved locally in browser storage
- **Undo/Redo functionality** - Comprehensive action history with Ctrl+Z support
- **CSV export** - Export your expenses for backup or analysis
- **Editable dates** - Customize the date for each expense entry
- **Real-time totals** - Automatic calculation of expense totals

### ⚡ **Performance & Accessibility**
- **Progressive Web App (PWA)** - Install on any device, works offline
- **Keyboard shortcuts** - Full keyboard navigation support
- **Fast loading** - Optimized bundle size and lazy loading
- **Cross-platform** - Works on iOS, Android, Windows, macOS, and Linux

## 🚀 Live Demo

Visit [pocketlog.netlify.app](https://pocketlog.netlify.app) to try PocketLog instantly!

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS Grid & Flexbox** - Modern layout techniques for responsive design

### **PWA & Performance**
- **Vite PWA Plugin** - Service worker generation and PWA manifest
- **Service Worker** - Offline functionality and caching strategies
- **Web App Manifest** - Native app-like installation experience

### **Development Tools**
- **ESLint** - Code linting with React and TypeScript rules
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript Compiler** - Strict type checking and modern JS features

### **Browser APIs**
- **Local Storage** - Client-side data persistence
- **Vibration API** - Haptic feedback on supported devices
- **File API** - CSV export functionality
- **Touch Events** - Gesture recognition for mobile interactions

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Local Development**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pocketlog.git
   cd pocketlog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🎯 Usage Guide

### **Adding Expenses**
1. Click the "Add First Expense" button or tap any cell in the new expense row
2. Enter a description for your expense
3. Press Tab or Enter to move to the amount field
4. Enter the expense amount
5. Press Tab or Enter to move to the date field (optional)
6. The expense is automatically saved when both description and amount are filled

### **Editing Expenses**
- **Tap any cell** to edit its content
- **Use Tab or Enter** to save and move to the next field
- **Press Escape** to cancel editing
- **Clear both description and amount** to delete an expense

### **Navigation**
- **Keyboard shortcuts:**
  - `Ctrl+Z` (or `Cmd+Z`) - Undo last action
  - `Ctrl+N` (or `Cmd+N`) - Start adding new expense
  - `Tab` - Move to next field
  - `Enter` - Save and move to next field
  - `Escape` - Cancel editing

### **Mobile Gestures**
- **Swipe left** on any expense row to delete
- **Tap and hold** for context menu (where supported)

### **Data Export**
1. Open the info modal (ℹ️ icon in header)
2. Click "Export CSV" to download your expenses
3. File will be named `pocketlog-expenses-YYYY-MM-DD.csv`

## 🏗️ Project Structure

```
pocketlog/
├── public/                 # Static assets
│   ├── apple-touch-icon.png
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/         # React components
│   │   ├── EmptyState.tsx
│   │   ├── ExpenseCell.tsx
│   │   ├── ExpenseRow.tsx
│   │   ├── InfoModal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── NewExpenseRow.tsx
│   │   └── SuccessIndicator.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useExpenses.ts
│   │   └── useSettings.ts
│   ├── types/             # TypeScript type definitions
│   │   └── expense.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### **PWA Settings**
The PWA configuration is in `vite.config.ts`:
- **Theme color:** `#10B981` (Emerald green)
- **Background color:** `#ffffff` (White)
- **Display mode:** `standalone`
- **Orientation:** `portrait`

### **Tailwind CSS**
Custom configuration in `tailwind.config.js`:
- **Dark mode:** Class-based switching
- **Custom animations:** Spin animation for loading states

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure mobile responsiveness
- Add proper error handling
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **Vite Team** - For the fast build tool
- **Netlify** - For hosting and deployment

## 📞 Support

If you encounter any issues or have questions:

1. **Check the [Issues](https://github.com/yourusername/pocketlog/issues)** page
2. **Create a new issue** with detailed information
3. **Visit the live demo** at [pocketlog.netlify.app](https://pocketlog.netlify.app)

---

**Made with ❤️ for better expense tracking**

*PocketLog - Your pocket-sized expense tracking companion*