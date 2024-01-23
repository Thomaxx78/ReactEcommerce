import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetArticlesQuery } from '../Services/API';
import Comment from '../Components/Comments';
import { useGetCommentsQuery, useCreateCommentMutation } from '../Services/API';
import { useCart } from '../Context/CartContext';
import Nav from '../Components/Nav';


const DetailedArticlePage = () => {
  const { id: articleId } = useParams();
  const { data: articles, isLoading, isError } = useGetArticlesQuery();
  const { addItemToCart, cart, removeItemFromCart } = useCart();

  const { data: comments, isLoading: isCommentsLoading, isError: isCommentsError } = useGetCommentsQuery(articleId);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [createComment, { isLoading: isCreatingComment }] = useCreateCommentMutation();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching article details</div>;
  }

  if (!articles) {
    return <div>Article not found</div>;
  }

  const article = articles.find((article) => article.id === articleId);

  if (isCommentsLoading) {
    return <div>Loading comments...</div>;
  }

  if (isCommentsError) {
    return <div>Error fetching comments</div>;
  }

  return (
    <div>
      <Nav />
      <div className='px-8'>
        <div className='border-4 rounded-lg flex items-center justify-center ml-auto mr-auto w-fit p-8 gap-32 mt-16'>
          <img className="aspect-square max-h-64 object-cover" src={article.image} alt={article.title}/>
          <div className='flex flex-col h-full'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold'>{article.title}</h1>
              <p className='text-lg font-bold text-orange-600'>{article.price}$</p>
            </div>
            <button className='mt-8 bg-orange-600 text-white p-4 w-full rounded-lg' onClick={() => addItemToCart(article)} >Ajouter au panier</button>
          </div>
        </div>
        <div className='mt-16 p-16 bg-gray-100 rounded-lg my-32'>
          <h2 className='text-3xl font-bold'>Les commentaires : </h2>
          <h2 className='text-xl font-semibold mb-2 mt-4'>Un avis ?</h2>
          <form className='flex gap-4'
            onSubmit={(e) => {
              e.preventDefault();
              createComment({ productId: articleId, username, comment });
            }}
          >
            <input className="px-2 rounded-lg" type="text" placeholder="Pseudo" value={username} onChange={handleUsernameChange} />
            <input className="px-2 rounded-lg" type="text" placeholder="Commentaire" value={comment} onChange={handleCommentChange} />
            <button className="bg-orange-600 text-white p-1.5 px-3 rounded-lg w-fit" type="submit" disabled={isCreatingComment}>
              Envoyer
            </button>
          </form>
          <hr className='my-4'></hr>
          <ul className='flex flex-col-reverse'>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment username={comment.username} comment={comment.comment} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailedArticlePage;
