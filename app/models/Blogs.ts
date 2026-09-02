import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogType: { type: String },
    ogImage: { type: String },
    banner: { type: String },
    bannerAlt: { type: String },
    pageTitle: { type: String, required: true },
    categories: [
        {
            name: { type: String, required: true },
        }
    ],
    blogs: [
        {
            mainTitle: { type: String, required: true },
            subTitle: { type: String },
            slug: { type: String, required: true },
            content: { type: String, required: true },
            thumbnail: { type: String },
            link: { type: String },
            thumbnailAlt: { type: String },
            images: [],
            category: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            date: { type: Date },
            metaTitle: { type: String },
            metaDescription: { type: String },
            ogType: { type: String },
            ogImage: { type: String },
            seoSchema:{type:String}
        }
    ]
});

export default mongoose.models.Blogs || mongoose.model("Blogs", blogsSchema);