import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnailAlt: {
        type: String,
    },
    slug: {
        type: String,
        required: true
    },
    images: {
        type:[String],
        default:[]
    },
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
})

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema)
