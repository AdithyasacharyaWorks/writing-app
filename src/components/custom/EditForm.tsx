"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Textarea } from "@/components/ui/textarea"; // ShadCN Textarea
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

interface EditFormProps {
    postId: string;
}

const EditForm: React.FC<EditFormProps> = ({ postId }) => {
    const [title, setTitle] = useState("");
    const [writingContent, setWritingContent] = useState("");
    const [isDraft, setIsDraft] = useState(false);
    const [loading, setLoading] = useState(true); // New state for loading
    const [errors, setErrors] = useState({ title: "", writing_content: "" });
    const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
    const router = useRouter();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`https://ananyawritings.netlify.app/api/post/${postId}`, {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to load post data");
                }

                const data = await response.json();
                setTitle(data?.data.title);
                setWritingContent(data?.data?.writing_content);
                setIsDraft(data?.data?.is_draft);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load post data.");
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { title: "", writing_content: "" };
        if (!title) newErrors.title = "Title is required";
        if (!writingContent) newErrors.writing_content = "Writing content is required";

        if (newErrors.title || newErrors.writing_content) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    writing_content: writingContent,
                    is_draft: isDraft,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update post");
            }

            toast.success("Post updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the post.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <Toaster />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    <span className="ml-3 text-lg font-semibold text-blue-500">Loading...</span>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6"
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
                            rows={10} // Adjust the height based on number of rows
                        />
                        {errors.writing_content && (
                            <div className="text-red-500 text-sm mt-2">{errors.writing_content}</div>
                        )}
                    </div>

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

                    <div className="flex justify-between items-center mt-6">
                        <Button
                            type="button"
                            onClick={() => router.push("/admin/list-posts")} // Redirect to the listing page
                            className="font-semibold py-2 px-4"
                        >
                            Back to Listing
                        </Button>
                        <Button type="submit" className="font-semibold py-2 px-4" disabled={isSubmitting}>
                            {isSubmitting ? "Updating..." : "Update Post"}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditForm;
