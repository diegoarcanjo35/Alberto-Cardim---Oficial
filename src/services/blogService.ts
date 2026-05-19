import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS as MOCK_POSTS } from '../constants';

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('acn_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('acn_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id' | 'slug'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      slug: post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updatedPost } : p));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return { posts, addPost, updatePost, deletePost };
}
