import { NextResponse } from 'next/server';
import { database } from '@/backend/index';

// Handle GET request
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const response = await database.getDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      id
    );

    return NextResponse.json({ message: 'Post retrieved successfully', data: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred'}, { status: 500 });
  }
}

// Handle PUT request
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const { title, writing_content, is_draft } = body;

    if (!title || !writing_content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const updatedDocument = await database.updateDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      id,
      {
        title,
        writing_content,
        is_draft
      }
    );

    return NextResponse.json({ message: 'Post updated successfully', data: updatedDocument }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred'}, { status: 500 });
  }
}

// Handle DELETE request
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    await database.deleteDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      id
    );

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred'}, { status: 500 });
  }
}
