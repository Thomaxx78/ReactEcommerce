// Comment.js
import React from 'react';

const Comment = ({ username, comment }) => (
  <div>
    <strong>{username}:</strong> {comment}
  </div>
);

export default Comment;
