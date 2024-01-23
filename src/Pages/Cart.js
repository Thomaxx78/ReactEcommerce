import React from 'react';
import { useCart } from '../Context/CartContext';
import Nav from '../Components/Nav';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, clearCart, removeItemFromCart } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  return (
    <div>
      <Nav />
      {cart.items.length === 0 ? (
        <div>
          <p className='text-6xl text-center mt-32 px-32 text-gray-600 font-bold'>Votre panier est vide :(</p>
          <Link to={`/articles`}>
            <button className='bg-orange-600 text-white p-4 w-1/2 xl:w-1/4 rounded-lg flex justify-center ml-auto mr-auto mt-16'>Retour aux articles</button>
          </Link>
        </div>
      ) : (
        <div>
          <ul className="grid grid-cols-4 gap-8 mt-8 px-8">
            {cart.items.map((item) => (
              <li key={item.id} className="border-gray-100 rounded-lg border-4 border-b-0">
                <img src={item.image} className="p-4 aspect-square w-full h-auto object-cover" alt="item.title"/>
                <div className='bg-gray-100 p-4 flex items-center justify-between'>
                  <h2 className='text-xl font-bold'>{item.title}</h2>
                  <p className='font-bold text-orange-600'>{item.price}$</p>
              </div>
                <button onClick={() => handleRemoveItem(item.id)} className='bg-orange-600 text-white p-4 w-full rounded-lg'>Supprimer</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart} className='bg-red-500 mb-16 text-white p-4 w-1/2 xl:w-1/4 rounded-lg flex justify-center ml-auto mr-auto mt-16'>Vider le panier</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
