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
    categories:[{
        title:{type:String},
        slug:{type:String},
        thumbnail:{type:String},
        altText:{type:String},
        images:[{type:String}]
    }],
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    ogType: {
        type: String,
    },
    ogImage: {
        type: String,
    },
    index: { type: Number, default: 0 },
})

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema)
