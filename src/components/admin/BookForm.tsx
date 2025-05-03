"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { SampleBooks } from "../../../types";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "../ui/textarea";
import FileUploader from "../FileUploader";
import ColorPicker from "./ColorPicker";
import { createBook } from "@/lib/actions/admin/actions/createBook";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

interface Props {
  type?: "create" | "update";
  book?: SampleBooks;
}

function BookForm({ type = "create", book }: Props) {
  const router = useRouter();
  const [submitimg, setSubmitimg] = useState<boolean>(false);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues:
      type === "create"
        ? {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
          }
        : { ...book },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    try {
      setSubmitimg(true);
      if (type === "create") {
        const result = await createBook(values);

        if (result.success) {
          toast.success("Book created successfully");

          router.push(`/admin/books/${result.data.id}`);
        } else {
          toast.error(`${result.message}`);
        }
      } else {
        if (!book || !book.id) {
          toast.error("No book selected to update.");
          return;
        }

        const res = await fetch(`/api/books/${book.id}`, {
          method: "PATCH",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data?.error || "Failed to update book.");
          return;
        }

        toast.success("Book updated successfully");
      }
    } catch (error) {
      toast.error("Server error please try again later.");
    } finally {
      setSubmitimg(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Title
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the book title"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"author"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the author name"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter the genre of the book"
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Rating
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={1}
                    max={5}
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Total number of books
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={0}
                    max={1000}
                    {...field}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Image
                </FormLabel>
                <FormControl>
                  <FileUploader
                    type="image"
                    accept="image/*"
                    variant="light"
                    placeholder="Upload a book cover"
                    onChangeField={field.onChange}
                    folder="books/cover"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Primary Color
                </FormLabel>
                <FormControl>
                  <ColorPicker
                    value={field.value}
                    onPickerChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    required
                    className="book-form_input h-80"
                    placeholder="Write brief description of the book"
                    // rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Video
                </FormLabel>
                <FormControl>
                  <FileUploader
                    type="video"
                    accept="video/*"
                    folder="books/video"
                    variant="light"
                    placeholder="Upload book trailer"
                    onChangeField={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal text-dark-500">
                  Book Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    required
                    className="book-form_input h-80"
                    placeholder="Write brief summary of the book"
                    minLength={10}
                    // rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="book-form_btn text-white">
            {submitimg ? (
              <Image
                src="/icons/loading-circle.svg"
                alt="Loading"
                width={40}
                height={40}
              />
            ) : type === "create" ? (
              "Add Book to Library"
            ) : (
              "Update The Book"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default BookForm;
