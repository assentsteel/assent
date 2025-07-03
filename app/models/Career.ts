import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
    pageTitle: String,
    banner: String,
    bannerAlt: String,
    firstSection: {
        title: String,
        description: String,
        items:[{
            title: String,
            description: String,
            image: String,
            imageAlt: String
        }]
    },
    secondSection: {
        title: String,
        description: String,
        image: String,
        imageAlt: String,
        items:[{
            title: String,
            logo: String,
            logoAlt: String,
        }]
    },
    thirdSection:{
        title: String,
        items:[{
            title: String,
            location: String,
        }]
    }
})

export default mongoose.models.Career || mongoose.model("Career",careerSchema)