
import React  from "react";
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";
import { Gallerydata, } from '@/public/types/Common';
import { getAllGalleries } from "@/lib/services/gallery.service";

const Index = async ({data,slug,categorySlug}:{data:Gallerydata,slug:string,categorySlug?:string}) => {

  const galleryList = await getAllGalleries();
  const currentGallery = galleryList?.find((item) => item.slug === slug);
  const currentCategory = currentGallery?.categories?.find((item) => item.slug === categorySlug);

  
  if (!currentGallery) {
    throw new Error('Gallery item not found');
  }
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: currentGallery.title, href: `/gallery-details/${slug}` },
    currentCategory && { label: currentCategory?.title, href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ].filter((item): item is { label: string; href: string } => Boolean(item));


  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={currentCategory?.title || currentGallery.title} />


      <HeadingText data={data} />

    </>
  );
}
export default Index
