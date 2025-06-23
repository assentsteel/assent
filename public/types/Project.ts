import { JSX } from "react"

export type Project =  {
    Project: any
    map(arg0: (item: any, index: any) => JSX.Element): import("react").ReactNode
    data:{
    name: string,
    slug: string,
        client: string,
    status: boolean;
    sector: string,
    consultant: string,
    location: string,
    thumbnail: string,
    thumbnailAlt: string,
    coverPhoto: string,
    coverPhotoAlt: string,
    title: string,
    description: string,
    metaTitle: string,
    metaDescription: string,
    featuredProject: true


    }
}