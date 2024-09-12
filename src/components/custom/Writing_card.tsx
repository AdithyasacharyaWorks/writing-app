"use client"
import React from 'react';

interface WritingCardProps {
  item: {
    $id: string;
    title: string;
    writing_content: string;
    user_id: string;
    is_draft: boolean;
    $createdAt: string;
    $updatedAt: string;
  };
}

const WritingCard: React.FC<WritingCardProps> = ({ item }) => {
  return (
    <div className="w-full max-w-sm mx-auto my-6 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6 h-full flex flex-col">
        <h2 className="text-2xl font-extrabold text-purple-600 mb-4">
          {item.title}
          
        </h2>
        <div className="text-gray-800 mb-6 flex-1" dangerouslySetInnerHTML={{ __html: item.writing_content }} />
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-blue-500">
            By: {item.user_id}
          </span>
          <span className="italic text-green-600">
            {new Date(item.$createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-4">
          {item.is_draft && (
            <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Draft
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingCard;
