// src/pages/admin/dashboard.tsx
import React from 'react';
import Link from 'next/link';
import Admin_header from "@/components/custom/Admin_header";
import { Button } from '../ui/button';

const Dashboard: React.FC = () => {
    // Mock data for post counts (replace with actual data fetching later)


    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 via-white to-purple-50">
            {/* Header */}
            <Admin_header />

            <div className="container mx-auto py-16 px-6">
                {/* Welcome Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Hello, Ananya <span role="img" aria-label="waving hand">👋</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Writing daily helps you grow and refine your skills. Make it a habit and watch your talent flourish! <span role="img" aria-label="smiling face">😊</span>
                    </p>

                </div>

                {/* Call to Action Section */}
                <div className="flex justify-center mb-10">
                    <Link href="/admin/post" passHref>
                        <Button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg transform transition-transform duration-300 hover:scale-105">
                            ✍️ Create New Post
                        </Button>
                    </Link>
                </div>

                {/* Post Statistics */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Posts</h2>
                        <p className="text-5xl font-bold text-green-600">{livePostsCount}</p>
                        <p className="text-sm text-gray-500 mt-2">Total number of posts currently published</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Draft Posts</h2>
                        <p className="text-5xl font-bold text-yellow-600">{draftPostsCount}</p>
                        <p className="text-sm text-gray-500 mt-2">Posts saved as drafts, ready to be completed</p>
                    </div>
                </div> */}

                {/* Link to List All Posts */}
                <div className="text-center">
                    <Link href="/admin/list-posts" >
                        <span className="text-xl text-blue-600 font-semibold hover:underline">
                            📄 View All Posts
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
