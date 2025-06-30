import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/app/models/Project";
import News from "@/app/models/News";
import Gallery from "@/app/models/Gallery";

export async function POST(req: NextRequest) {
    const { searchQuery } = await req.json();
    await connectDB();
    const projectResults = await Project.aggregate([
        {
          $search: {
            index: "projects",
            text: {
              query: searchQuery,
              path: {
                wildcard: "*"
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0
              }
            }
          }
        },
        { $unwind: "$categories" },
        { $unwind: "$categories.projects" },
        {
          $match: {
            $or: [
              { "categories.projects.title": { $regex: searchQuery, $options: "i" } },
              { "categories.projects.pageTitle": { $regex: searchQuery, $options: "i" } },
              { "categories.projects.description": { $regex: searchQuery, $options: "i" } },
              { "categories.projects.location": { $regex: searchQuery, $options: "i" } },
              { "categories.projects.sector": { $regex: searchQuery, $options: "i" } }
            ]
          }
        },
        { $project: { _id: 0, project: "$categories.projects",category:"$categories.slug" } }
      ]);

      const newsResults = await News.aggregate([
        {
          $search: {
            index: "news", // your Atlas Search index name
            text: {
              query: searchQuery,
              path: {
                wildcard: "*"
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0
              }
            }
          }
        },
        { $unwind: "$news" },
        {
          $match: {
            $or: [
              { "news.mainTitle": { $regex: searchQuery, $options: "i" } },
              { "news.subTitle": { $regex: searchQuery, $options: "i" } },
              { "news.content": { $regex: searchQuery, $options: "i" } },
              { "news.category": { $regex: searchQuery, $options: "i" } },
              { "news.metaTitle": { $regex: searchQuery, $options: "i" } },
              { "news.metaDescription": { $regex: searchQuery, $options: "i" } }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            type: { $literal: "news" },
            item: "$news"
          }
        }
      ]);

      const galleryResults = await Gallery.aggregate([
        {
          $search: {
            index: "gallery", // make sure this matches your Atlas Search index name
            text: {
              query: searchQuery,
              path: {
                wildcard: "*"
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 0
              }
            }
          }
        },
        {
          $match: {
            $or: [
              { title: { $regex: searchQuery, $options: "i" } },
              { thumbnailAlt: { $regex: searchQuery, $options: "i" } },
              { slug: { $regex: searchQuery, $options: "i" } }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            type: { $literal: "gallery" },
            item: "$$ROOT"
          }
        }
      ]);
      
      
      const combined = [...projectResults, ...newsResults,...galleryResults];

    return NextResponse.json({ success: true, data: combined });
}