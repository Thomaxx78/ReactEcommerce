import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

export default function Nav() {

    const { cart } = useCart();

    return (
        <nav className='flex items-center w-full px-8 border-b-4 border-b-gray-100'>
            <Link className='flex items-center w-1/4' to='/'>
                    <p className='text-orange-600 text-xl font-bold'>Fauxprix</p>
                    <img src='logo.png' className='max-w-16' alt='logo' />
            </Link>
            <ul className='flex w-1/2 justify-center items-center gap-20 p-8'>
                <li>
                <Link to='/'>
                    <h1 className=' text-xl font-semibold'>Accueil</h1>
                </Link>
                </li>
                <li>
                <Link to='/articles'>
                    <h1 className=' text-xl font-semibold'>Articles</h1>
                </Link>
                </li>
            </ul>
            <Link to='/cart' className='ml-auto'>
                <button className='text-orange-600 text-lg font-bold flex items-center gap-2'>
                <img src="panier.png" className='max-w-8'></img> ({cart.items.length} {cart.items.length === 1 ? 'article' : 'articles'})
                </button>
            </Link>
        </nav>
)}