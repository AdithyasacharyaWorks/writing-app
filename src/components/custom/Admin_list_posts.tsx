import React from 'react';
import PostList from '@/components/custom/Post_list';
import Link from 'next/link';
import { Button } from '../ui/button';

const ListPosts: React.FC = async () => {

  // Fetch posts data
  const posts_response = await fetch('https://ananyawritings.netlify.app//api/post?isAdmin=true', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: "no-store"
  });
  const posts_data = await posts_response?.json();

  // Delete post function

  return (
    <div className="relative min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-white bg-black text-center mb-12 p-2 sticky top-0"> All Posts</h1>
      <div className="container mx-auto py-12 px-6">

        {/* Pass deletePost function to PostList */}
        <PostList posts={posts_data?.data} />
      </div>

      {/* Fixed Button to Navigate to Dashboard */}
      <div className="fixed bottom-6 right-6">
        <Link href="/admin">
          <Button>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ListPosts;
