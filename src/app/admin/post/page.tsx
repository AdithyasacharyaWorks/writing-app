"use client";
import React from 'react';
import PostForm from '@/components/custom/Post_form';


const CreatePost: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white p-2 sticky top-0 bg-black mb-8 text-center">Create New Post</h1>
        <PostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
