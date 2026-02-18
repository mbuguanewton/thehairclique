import type { StructureResolver } from "sanity/structure";
import { Layout, FileText, Cog } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title("Site Settings")
        .icon(Cog)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),

      S.divider(),

      // Group: Site Pages
      S.listItem()
        .title("Site Pages")
        .icon(Layout)
        .child(
          S.list()
            .title("Site Pages")
            .items([
              // All pages
              S.documentTypeListItem("page").title("All Pages"),

              // Marketing pages folder/category
              S.listItem()
                .title("Marketing Pages")
                .child(
                  S.documentList()
                    .title("Marketing Pages")
                    .filter('_type == "page" && category == "marketing"'),
                ),

              S.divider(),

              // Other categories could go here...
              S.listItem()
                .title("Blogs")
                .child(
                  S.documentList()
                    .title("Blogs")
                    .filter('_type == "page" && category == "blog"')
                    .defaultOrdering([{ field: "title", direction: "asc" }]),
                ),
            ]),
        ),

      // List out all other document types that aren't specifically handled above
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["page", "post", "siteSettings"].includes(listItem.getId() || ""),
      ),
    ]);
