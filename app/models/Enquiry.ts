import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
    generalEnquiry:[{
        name: {
            type: String,
            required: true
        },
        emailid: {
            type: String,
            required: true
        },
        contactnumber: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }],
    registrationForm:[{
        nameofthecompany: {
            type: String,
            required: true
        },
        typeofproduct: {
            type: String,
            required: true
        },
        contactperson: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        contactno: {
            type: String,
            required: true
        },
        emailid: {
            type: String,
            required: true
        },
        tradelicense: {
            type: String,
            required: true
        },
        vatregistration: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }],
    downloadForm:[{
        name: {
            type: String,
            required: true
        },
        emailid: {
            type: String,
            required: true
        },
        contactno: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        companyname: {
            type: String,
            required: true
        },
        requestType: {
            type: String,
            required: true
        },
        purpose: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }]
})

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
