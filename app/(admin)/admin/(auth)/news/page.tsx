"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DeleteNewsDialog from "./components/DeletenewsDialog";

type News = {
  _id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  tags: string[];
  type: "event" | "news";
};

export default function AdminProducts() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/admin/news");
      const data = await response.json();
      setNews(data.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleClickNewNews = () => {
    router.push("/admin/news/new");
  };

  const handleEditNews = (newsId: string) => {
    router.push(`/admin/news/${newsId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News</h1>
        <Button className="bg-primary text-white" onClick={handleClickNewNews}>
          <span className="mr-2">+</span>
          Add News
        </Button>
      </div>

      {news?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No news found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first news</p>
          <Button className="bg-primary text-white" onClick={handleClickNewNews}>
            <span className="mr-2">+</span>
            Add News
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news?.map((news, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="aspect-video relative">
                <Image fill src={news.images[0]} alt={news.title} className="object-cover w-full h-full" />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{news.title}</h2>
                    <p className="text-sm text-gray-500">{news.type === "event" ? "Event" : "News"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10"
                      onClick={() => handleEditNews(news._id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <DeleteNewsDialog newsId={news._id} onDelete={fetchNews} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
