import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  items: [],
};

const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case cartActions.REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case cartActions.CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: cartActions.ADD_ITEM, payload: item });
    
  };

  const removeItemFromCart = (itemId) => {
    dispatch({ type: cartActions.REMOVE_ITEM, payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
