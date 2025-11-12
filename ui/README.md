# AI Shopping Assistant - Frontend# React + Vite

A React + Vite application with an AI-powered shopping assistant for a dessert store.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 FeaturesCurrently, two official plugins are available:

- **React 19**: Latest React with modern features- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

- **Vite 7**: Lightning-fast build tool and dev server- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Tailwind CSS 4**: Utility-first CSS framework

- **Zustand**: Lightweight state management## Expanding the ESLint configuration

- **Custom AI Chat**: Sidebar chat interface with AI assistant

- **React Markdown**: Markdown rendering for chat messagesIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **Shopping Cart**: Full cart management (add, remove, update quantities)
- **Order Confirmation**: Process orders with confirmation modal

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running on port 8000

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The app will start on `http://localhost:5173` (or next available port)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
ui/
├── public/
│   └── assets/
│       ├── design/          # Design files
│       ├── fonts/           # Custom fonts
│       └── images/          # Product images
├── src/
│   ├── components/
│   │   ├── CardsContainer.jsx    # Product grid
│   │   ├── Cart.jsx              # Shopping cart component
│   │   ├── CartButton.jsx        # Cart toggle button
│   │   ├── CartItem.jsx          # Individual cart item
│   │   ├── CustomChat.jsx        # AI chat sidebar
│   │   ├── OrderConfirmed.jsx    # Order confirmation modal
│   │   ├── ProductCard.jsx       # Product card
│   │   └── TotalOrder.jsx        # Cart total
│   ├── hooks/
│   │   └── useCustomChat.js      # Chat logic and actions
│   ├── store/
│   │   └── cart.store.js         # Zustand cart state
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── data.json                     # Product catalog
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Components Overview

### CustomChat

AI-powered chat sidebar that:

- Opens/closes from the right side
- Maintains independent scroll
- Renders markdown messages
- Executes cart actions via AI

### Cart Management

State managed with Zustand:

- Add items to cart
- Remove items
- Update quantities
- Clear cart
- Calculate total

### Product Catalog

Displays desserts from `data.json`:

- Product images
- Names and categories
- Prices
- Add to cart buttons

## 🤖 AI Chat Actions

The chat assistant can:

1. **Add products**: "Add 2 waffles to my cart"
2. **Remove products**: "Remove the brownie"
3. **Update quantities**: "Change waffles to 5 units"
4. **View cart**: "What's in my cart?"
5. **Clear cart**: "Empty my cart"
6. **Process order**: "Process my order"

## 🔧 Configuration

### Backend Connection

The frontend connects to the backend at:

```javascript
http://localhost:8000/chat
```

To change this, edit `src/hooks/useCustomChat.js`:

```javascript
const response = await fetch("http://localhost:8000/chat", {
  // ...
});
```

### Product Data

Products are defined in `data.json`:

```json
[
  {
    "name": "Waffle with Berries",
    "category": "Waffle",
    "price": 6.5,
    "image": {
      "thumbnail": "./assets/images/...",
      "mobile": "...",
      "tablet": "...",
      "desktop": "..."
    }
  }
]
```

## 📚 Key Dependencies

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Markdown** - Markdown rendering

## 🎨 Styling

The app uses Tailwind CSS 4 with:

- Custom color palette (rose theme)
- Responsive breakpoints (mobile, tablet, desktop)
- Custom animations
- Typography plugin for markdown

## 🛡️ Features

### Responsive Design

- Mobile-first approach
- Breakpoints: 768px (md), 1024px (xl)
- Flexible layouts

### State Management

- Zustand for global cart state
- Local state for UI components
- Persistent actions across sessions

### Chat Interface

- Sidebar layout (doesn't overlap content)
- Markdown support for rich messages
- Loading states
- Error handling

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Vite will automatically use next available port
# Or specify a port:
npm run dev -- --port 3000
```

### Backend Connection Errors

- Ensure backend is running on port 8000
- Check CORS settings in backend
- Verify API endpoint URL

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling Issues

```bash
# Rebuild Tailwind
npm run dev
```

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Improvements

- [ ] Add product search/filter
- [ ] Product recommendations
- [ ] Order history
- [ ] User authentication
- [ ] Payment integration
- [ ] Multi-language support

## 📄 License

MIT

## 🔗 Related

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
