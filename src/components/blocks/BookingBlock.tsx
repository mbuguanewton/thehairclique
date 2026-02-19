import { client } from "@/sanity/lib/client";
import BookingForm from "@/components/blocks/BookingForm";

interface BookingBlockProps {
  title?: string;
  description?: string;
  image?: any;
  isPromo?: boolean;
  ctaLink?: string;
}

async function getAvailability() {
  const query = `*[_type == "availability"][0]`;
  return await client.fetch(query);
}

export default async function BookingBlock({
  title,
  description,
  image,
  isPromo,
  ctaLink,
}: BookingBlockProps) {
  const availability = await getAvailability();

  return (
    <section className="py-24 px-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <BookingForm
          title={title}
          description={description}
          image={image}
          isPromo={isPromo}
          ctaLink={ctaLink}
          availability={availability}
        />
      </div>
    </section>
  );
}
