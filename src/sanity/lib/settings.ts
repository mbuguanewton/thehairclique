import { client } from "./client";

export async function getSettings() {
  const query = `*[_type == "siteSettings"][0]{
    ...,
    ogImage {
      asset->
    }
  }`;
  return await client.fetch(query);
}
