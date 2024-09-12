"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { toast, Toaster } from 'sonner'; // Import toast from Sonner

interface Post {
  $id: string;
  title: string;
  writing_content: string;
  user_id: string;
  is_draft: boolean;
  $createdAt: string;
  $updatedAt: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleDeleteClick = (postId: string) => {
    setSelectedPostId(postId);
  };

  const confirmDelete = async () => {
    if (selectedPostId) {
      try {
        const response = await fetch(`/api/post/${selectedPostId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          toast.success('Post deleted successfully!'); // Show success notification
          window.location.reload(); // Refresh the page after deletion
        } else {
          const error = await response.json();
          toast.error(`Error: ${error.message}`); // Show error notification
        }
      } catch (error) {
        toast.error('An error occurred while deleting the post.'); // Show error notification
      }
    }

    setSelectedPostId(null); // Close the modal after deletion
  };

  const cancelDelete = () => {
    setSelectedPostId(null); // Close the modal
  };

  return (
    <div className="space-y-8">
      <Toaster />
      {posts?.map((post) => (
        <div key={post.$id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>
          <div className="text-gray-800 mb-6 flex-1" dangerouslySetInnerHTML={{ __html: post.writing_content }} />
          <div className="flex justify-between items-center text-gray-600 text-sm">
            <span className="font-medium">By: {post.user_id}</span>
            <span className="italic">{new Date(post.$createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600 text-sm mt-1">
            <span className="font-medium">Type: {post.is_draft?"Draft":"Live"}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button variant={"destructive"} onClick={() => handleDeleteClick(post.$id)}>
              Delete
            </Button>
            <Link href={`/admin/edit_post/${post.$id}`} passHref>
              <Button variant={"default"}>Edit</Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Modal for Confirming Deletion */}
      {selectedPostId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Delete Post</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex justify-end">
              <Button variant="secondary" className="mr-2" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
