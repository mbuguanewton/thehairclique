import { client } from "@/sanity/lib/client";
import BookingForm from "@/components/blocks/BookingForm";

interface BookingBlockProps {
  title?: string;
  description?: string;
  isPromo?: boolean;
  ctaLink?: string;
  anchorId?: string;
}

async function getAvailability() {
  const query = `*[_type == "availability"][0]`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function BookingBlock({
  title,
  description,
  isPromo,
  ctaLink,
  anchorId,
}: BookingBlockProps) {
  const availability = await getAvailability();

  return (
    <section id={anchorId} className="py-12 px-4 md:py-24 md:px-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <BookingForm
          title={title}
          description={description}
          isPromo={isPromo}
          ctaLink={ctaLink}
          availability={availability}
        />
      </div>
    </section>
  );
}
