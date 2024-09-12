import React from 'react';
import EditForm from '@/components/custom/EditForm';

const EditPostPage = ({ params }: { params: { id: string[] } }) => {
  const id = params.id[0];

  return (
    <div className=''>
      <h1 className="text-3xl font-semibold mb-4 flex justify-center text-white sticky top-0 bg-black p-2">Edit Post</h1>
      <EditForm postId={id} />
    </div>
  );
};

export default EditPostPage;
