import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    metaTitle:{ type: String },
    metaDescription:{ type: String },
    banner:{ type: String },
    bannerAlt:{ type: String},
    pageTitle:{ type: String, required: true },
    categories:[
        {
            name:{ type: String, required: true },
        }
    ],
    news:[
        {
            mainTitle:{ type: String, required: true },
            subTitle: { type: String},
            slug: { type: String, required: true },
            content: { type: String, required: true },
            thumbnail: { type: String, required: true },
            thumbnailAlt: { type: String, required: true },
            images:{ type: Array, required: true },
            category: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            date: { type: Date },
            metaTitle: { type: String },
            metaDescription: { type: String },
        }
    ]
});

export default mongoose.models.News || mongoose.model("News", newsSchema);