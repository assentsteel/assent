"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

// Dynamically import React Quill to avoid SSR issues
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TagInput } from "./components/TagInput";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TinyEditor from "@/app/component/TinyMce/TinyEditor";
import { uploadImagesFromEditor } from "@/app/helpers/uploadImagesFromEditore";

interface NewsFormData {
  title: string;
  description: string;
  tags: string[];
  date: string;
  images: string[];
  type: "event" | "news";
}

interface NewsFormProps {
  newsId?: string;
}



const NewsForm = ({ newsId }: NewsFormProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newsContent,setNewsContent] = useState("")
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewsFormData>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      date: new Date().toISOString().split("T")[0],
      images: [],
      type: "news",
    },
  });

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`/api/admin/news/byid?id=${newsId}`);
      const data = await response.json();
      setValue("title", data.data.title);
      setValue("description", data.data.description);
      setValue("tags", data.data.tags);
      setValue("images", data.data.images);
      setValue("type", data.data.type);
      if(data.data.description){
        setNewsContent(data.data.description)
      }
      setImageUrls(data.data.images);
    };
    fetchNews();
  }, [newsId]);

  const handleImageUpload = async (uploadedUrl: string) => {
    setImageUrls((prev) => [...prev, uploadedUrl]);
    setValue("images", [...imageUrls, uploadedUrl]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    setValue(
      "images",
      imageUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  const onSubmit = async (data: NewsFormData) => {
    try {
      setIsLoading(true);
      const actualContent = await uploadImagesFromEditor(newsContent)
      if(actualContent){
        data = {...data,description:actualContent}
      }
      if (newsId) {
        console.log("here",data)
        const response = await fetch(`/api/admin/news/byid?id=${newsId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/news");
      } else {
        const response = await fetch(`/api/admin/news`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/news");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(()=>{
    setValue("description",newsContent)
  },[newsContent])



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </Label>
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </Label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Description Field */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Description</Label>
              <TinyEditor setNewsContent={setNewsContent} newsContent={newsContent}/>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        {/* Tags Field */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Tags</Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => <TagInput value={field.value} onChange={field.onChange} placeholder="Add tags..." />}
          />
        </div>

        {/* Date Field */}
        <div>
          <Label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </Label>
          <Input
            {...register("date", { required: "Date is required" })}
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
        </div>

        {/* Images Field */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Cover Image</Label>
          {imageUrls.length == 0 && <div className="mt-2">
            <ImageUploader onChange={handleImageUpload} deleteAfterUpload={true} />
          </div>}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative h-40">
                <Image
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                  width={100}
                  height={100}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
