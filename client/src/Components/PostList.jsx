import React from 'react';
import { useState } from 'react';

const PostList = ({ posts = [], handleLike, handleCommentSubmit, handleFollow }) => {
  const [comment, setComment] = useState('');

  // Handle comment input change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="p-4 mb-4 border rounded-md shadow-md">
            <img
              src={`http://127.0.0.1:5000${post.image_url}`}  // Ensure this path is correct for displaying images
              alt="Post"
              className="rounded-lg"
              style={{ maxWidth: '100%', maxHeight: '300px' }}  // Adjust image styling as per your UI needs
            />
            <p className="mt-2">{post.hashtags}</p>
            <p>Likes: {post.likes}</p>
            <button
              onClick={() => handleLike(post.id)}
              className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
            >
              Like
            </button>
            <button
              onClick={() => handleFollow(post.id)}
              className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-700"
            >
              Follow
            </button>
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Enter your comment"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={() => handleCommentSubmit(post.id, comment)}
              className="px-4 py-2 font-bold text-white bg-gray-500 rounded-md hover:bg-gray-700"
            >
              Comment
            </button>
            <div className="mt-2">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <p key={index} className="text-sm">{comment.content} - {comment.sentiment}</p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p> </p> // No posts available
      )}
    </div>
  );
};

export default PostList;
