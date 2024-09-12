import { NextResponse } from 'next/server';
import { ID } from 'appwrite';
import {database} from "@/backend/index"
import { Query } from 'appwrite';
export async function POST(request: Request) {
  try {
    const { writing_content, user_id, title, is_draft } = await request.json();

    if (!writing_content || !user_id || !title) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    console.log(writing_content);   
    const response = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.COLLECTION_ID!,
      ID.unique(),
      {
        writing_content,
        user_id,
        title,
        is_draft,
      }
    );

    return NextResponse.json({ message: 'Post created successfully', data: response }, { status: 201 });
  } catch (err) {
    // Handle errors
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('isAdmin') === 'true';  // Get isAdmin from query parameters
    console.log(isAdmin);

    let response;
    if (isAdmin) {
      response = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.COLLECTION_ID!
      );
    } else {
      response = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.COLLECTION_ID!,
        [
          Query.equal("is_draft", false)
        ]
      );
    }

    console.log(response.documents)
    return NextResponse.json({ message: 'Posts retrieved successfully', data: response.documents }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
