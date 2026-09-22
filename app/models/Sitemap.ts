import mongoose from "mongoose";

const sitemapSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    urlCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Sitemap = mongoose.models.Sitemap || mongoose.model("Sitemap", sitemapSchema);

export default Sitemap;
