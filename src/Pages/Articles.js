import React from 'react';
import { useGetArticlesQuery } from '../Services/API';
import { Link } from 'react-router-dom';
import '../index.css';
import { useCart } from '../Context/CartContext';
import Nav from '../Components/Nav';

const ArticlesPage = () => {
  const { data: articles, isLoading, isError } = useGetArticlesQuery();
  const { addItemToCart, cart, removeItemFromCart } = useCart();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching articles</div>;
  }

  return (
    <div>
      <Nav />
      <div className='px-8 my-16'>
        <h1 className="font-bold text-3xl">Découvrez nos nombreux articles de qualités :</h1>
        <ul className='grid grid-cols-4 gap-8 mt-8 px-4'>
        {articles.map((article) => (
          <li className=' border-gray-100 rounded-lg border-4 border-b-0' key={article.id}>
              <Link to={`/articles/${article.id}`}>
              <img className="aspect-square w-full h-auto object-cover p-4" src={article.image} alt={article.title}/>
              <div className='bg-gray-100 p-4 flex items-center justify-between'>
                  <h2 className='text-xl font-bold'>{article.title}</h2>
                  <p className='font-bold text-orange-600'>{article.price}$</p>
              </div>
              </Link>
              <button
                className='bg-orange-600 text-white p-4 w-full rounded-lg'
                onClick={() => addItemToCart(article)}
              >Ajouter au panier</button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlesPage;
