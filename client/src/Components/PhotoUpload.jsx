import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  // Function to fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle hashtags input change
  const handleHashtagsChange = (e) => {
    setHashtags(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !hashtags) {
      alert('Please select an image and enter hashtags.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('hashtags', hashtags);

    try {
      await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchPosts();  // Refresh the list of posts
      setFile(null);
      setHashtags('');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:5000/like/${postId}`);
      fetchPosts();  // Refresh the list of posts
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Handle following a post
  const handleFollow = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:5000/follow/${postId}`);
      fetchPosts();  // Refresh the list of posts
    } catch (error) {
      console.error('Error following post:', error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (postId, comment) => {
    // console.log(postId);
    // console.log("post id submitted")
    if (!comment) {
      alert('Please enter a comment.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:5000/comment', {
        post_id: postId,
        content: comment,
        sentiment: 'neutral' // Placeholder sentiment value
      });
      fetchPosts();  // Refresh the list of posts
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Upload an Image</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            value={hashtags}
            onChange={handleHashtagsChange}
            placeholder="Enter hashtags"
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      </div>

      <PostList
        posts={posts}  // Pass the posts state to PostList
        handleLike={handleLike}
        handleCommentSubmit={handleCommentSubmit}
        handleFollow={handleFollow}
      />
    </div>
  );
};

export default PhotoUpload;
