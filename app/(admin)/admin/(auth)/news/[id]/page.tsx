"use client";

import NewsForm from "../news-form";
import { useParams } from "next/navigation";

export default function NewsPage() {
  const params = useParams();
  return <NewsForm newsId={params.id as string} />;
}
