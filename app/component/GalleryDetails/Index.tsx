 
import React  from "react"; 
import Herotext from "../common/Banner/Herotext";
import HeadingText from "./sections/HeadingText";
import { Gallerydata, } from '@/public/types/Common'; 

// Define the type for the gallery data response
type GalleryItem = {
  title: string;
  thumbnail: string;
  thumbnailAlt: string;
  slug: string;
  images: string[];
};

 

const Index = async ({data,slug}:{data:Gallerydata,slug:string}) => { 
   
  const response = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, {
    next: { revalidate: 60 }  
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch gallery data');
  }
  
  const galleryData = await response.json();
  const galleryList = galleryData.data;  
  const currentGallery = galleryList?.find((item: GalleryItem) => item.slug === slug);
  
  if (!currentGallery) {
    throw new Error('Gallery item not found');
  }
   
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: currentGallery.title, href: "" },

    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>

      <Herotext breadcrumbs={breadcrumb} title={currentGallery.title} />


      <HeadingText data={data} />

    </>
  );
}
export default Index
