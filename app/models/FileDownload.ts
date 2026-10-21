import mongoose from "mongoose";

const fileDownloadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.FileDownload || mongoose.model("FileDownload", fileDownloadSchema);
