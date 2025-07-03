import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
    banner: String,
    bannerAlt: String,
    pageTitle: String,
    firstSection: {
        title: String,
        items: [{
            title: String,
            address: String,
            phone: String,
            email: String,
            fax: String,
            workingHours: String,
            map: String,
        }]
    }
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);