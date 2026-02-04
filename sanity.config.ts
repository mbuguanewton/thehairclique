import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

export default defineConfig({
  name: "thehairclique",
  title: "The Hair Clique",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "thehairclique",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool(), unsplashImageAsset(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
