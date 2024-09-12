"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

interface PostFormProps {
  initialValues?: {
    title: string;
    writing_content: string;
    is_draft: boolean;
  };
  isEditing?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  initialValues = { title: "", writing_content: "", is_draft: true },
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [writingContent, setWritingContent] = useState(
    initialValues.writing_content
  );
  const [isDraft, setIsDraft] = useState(initialValues.is_draft);
  const [errors, setErrors] = useState({ title: "", writing_content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = { title: "", writing_content: "" };
    if (!title) newErrors.title = "Title is required";
    if (!writingContent) newErrors.writing_content = "Writing content is required";

    if (newErrors.title || newErrors.writing_content) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          writing_content: writingContent,
          is_draft: isDraft,
          user_id: 'Annie Achar', // Replace with actual user ID logic if necessary
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Handle success
      toast.success('Post created successfully!');
      setTimeout(() => {
        router.replace("/admin");
      }, 2000);
    } catch (error) {
      // Handle errors
      console.error(error);
      toast.error('An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 text-black"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full"
          />
          {errors.title && (
            <div className="text-red-500 text-sm mt-2">{errors.title}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="writing_content"
            className="block text-sm font-medium text-gray-700"
          >
            Writing Content
          </label>
          <Textarea
            id="writing_content"
            name="writing_content"
            value={writingContent}
            onChange={(e) => setWritingContent(e.target.value)}
            className="mt-1 block w-full"
            rows={6} // Adjust rows for better visibility
          />
          {errors.writing_content && (
            <div className="text-red-500 text-sm mt-2">
              {errors.writing_content}
            </div>
          )}
        </div>

        <div className="p-3"></div>
        <div className="mt-6">
          <label
            htmlFor="is_draft"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <Select
            onValueChange={(value) => setIsDraft(value === "draft")}
            value={isDraft ? "draft" : "live"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={isDraft ? "Draft" : "Live"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between">
          <Button onClick={() => router.push("/admin")} className="mb-6">
            Go to Dashboard
          </Button>
          <Button type="submit" className="font-semibold py-2 px-4" disabled={isSubmitting}>
            {isEditing ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
