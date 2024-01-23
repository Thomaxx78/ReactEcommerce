import React from 'react';
import { useCart } from '../Context/CartContext';
import Nav from '../Components/Nav';
import { Link } from 'react-router-dom';
import { useGetArticlesQuery } from '../Services/API';

const CartPage = () => {
    const { data: articles, isLoading, isError } = useGetArticlesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error fetching articles</div>;
      }
    return (
        <div>
            <Nav />
            <div class="flex gap-4 items-center justify-center mt-16">
                <h1 class="text-6xl font-bold">Bienvenue chez </h1>
                <div class="flex items-center justify-center">
                    <h1 class="text-orange-600 text-6xl font-bold">Fauxprix</h1>
                    <img src='logo.png' className='max-w-32' alt='logo' />
                </div>
            </div>
            <div class="flex items-center justify-center mt-16 px-16">
            {articles.map((article) => (
                <div className=' border-gray-100 rounded-lg border-8 p-4' key={article.id}>
                    <img className="aspect-square w-full h-auto object-cover" src={article.image} alt={article.title}/>
                </div>
            ))}
            </div>
            <Link to={`/articles`}>
            <button className='mb-16 bg-orange-600 text-white p-4 w-1/2 xl:w-1/4 rounded-lg flex justify-center ml-auto mr-auto mt-16 font-bold'>Découvrir nos articles</button>
          </Link>
        </div>
    );
}

export default CartPage;