// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesPage from './Pages/Articles';
import Home from './Pages/Home';
import DetailedArticlePage from './Pages/Article';
import CartPage from './Pages/Cart';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { CartProvider } from './Context/CartContext';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<DetailedArticlePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </Provider>
);

// Utilisez ReactDOM.createRoot au lieu de React.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);

reportWebVitals();
