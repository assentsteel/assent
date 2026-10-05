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
    ogTitle: {
        type: String,
    },
    ogDescription: {
        type: String,
    },
    ogType: {
        type: String,
    },
    ogImage: {
        type: String,
    },
    twitterTitle: {
        type: String,
    },
    twitterDescription: {
        type: String,
    },
    twitterImage: {
        type: String,
    },
    schema: {
        type: String,
    },
})

export default mongoose.models.GalleryMeta || mongoose.model("GalleryMeta", galleryMetaSchema)