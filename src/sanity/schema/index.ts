import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import blockContent from "./blockContent";
import hero from "./blocks/hero";
import richText from "./blocks/richText";
import showcase from "./blocks/showcase";
import services from "./blocks/services";
import features from "./blocks/features";
import imageWithText from "./blocks/imageWithText";

import post from "./post";

import siteSettings from "./siteSettings";

import blogList from "./blocks/blogList";
import simpleHero from "./blocks/simpleHero";
import featureBlock from "./blocks/featureBlock";

import booking from "./booking";
import availability from "./availability";
import bookingBlock from "./blocks/bookingBlock";

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  blockContent,
  post,
  siteSettings,
  hero,
  richText,
  showcase,
  services,
  features,
  imageWithText,
  blogList,
  simpleHero,
  booking,
  availability,
  bookingBlock,
  featureBlock,
];
