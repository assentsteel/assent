import mongoose from "mongoose";

const galleryMetaSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    ogType: {
        type: String,
    },
    ogImage: {
        type: String,
    },
})

export default mongoose.models.GalleryMeta || mongoose.model("GalleryMeta", galleryMetaSchema)