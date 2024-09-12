import React from 'react';
import WritingList from '@/components/custom/List_writing_card';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';


const Home: React.FC = async () => {
  const isAdmin = false;  // Set the isAdmin flag here
  
  const posts_response = await fetch(`http://localhost:3000/api/post?isAdmin=${isAdmin}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: "no-store"
  });
  const posts_data = await posts_response?.json();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Header />
      <div className="container mx-auto my-12 px-4 flex-grow">
        {posts_data?.data?.length === 0 && <h2>No posts yet</h2>}
        <WritingList items={posts_data?.data} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
