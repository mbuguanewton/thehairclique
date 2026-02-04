import { type SchemaTypeDefinition } from "sanity";
import page from "./page";
import hero from "./blocks/hero";
import richText from "./blocks/richText";
import showcase from "./blocks/showcase";
import services from "./blocks/services";
import features from "./blocks/features";
import imageWithText from "./blocks/imageWithText";

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  hero,
  richText,
  showcase,
  services,
  features,
  imageWithText,
];
