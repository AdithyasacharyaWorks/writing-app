import React from 'react';
import WritingCard from './Writing_card';

interface WritingItem {
  $id: string;
  title: string;
  writing_content: string;
  user_id: string;
  is_draft: boolean;
  $createdAt: string;
  $updatedAt: string;
}

interface WritingListProps {
  items: WritingItem[];
}

const WritingList: React.FC<WritingListProps> = ({ items }) => {
  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items?.map(item => (
          <WritingCard key={item.$id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WritingList;
