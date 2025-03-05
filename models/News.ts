import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  date: Date,
  tags: [String],
  type: {
    type: String,
    enum: ["event", "news"],
    default: "news",
  },
});

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

export default News;
