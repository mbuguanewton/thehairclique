import HeroBlock from "./blocks/HeroBlock";
import RichTextBlock from "./blocks/RichTextBlock";
import ShowcaseBlock from "./blocks/ShowcaseBlock";
import ServicesBlock from "./blocks/ServicesBlock";
import FeaturesBlock from "./blocks/FeaturesBlock";
import ImageWithTextBlock from "./blocks/ImageWithTextBlock";
import BlogListBlock from "./blocks/BlogListBlock";
import SimpleHeroBlock from "./blocks/SimpleHeroBlock";

interface Block {
  _type: string;
  _key: string;
  [key: string]: any;
}

interface BlockRendererProps {
  blocks?: Block[];
}

const blockMap: Record<string, any> = {
  hero: HeroBlock,
  richText: RichTextBlock,
  showcase: ShowcaseBlock,
  services: ServicesBlock,
  features: FeaturesBlock,
  imageWithText: ImageWithTextBlock,
  blogList: BlogListBlock,
  simpleHero: SimpleHeroBlock,
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockMap[block._type];
        if (!Component) {
          console.warn(`No component found for block type: ${block._type}`);
          return null;
        }
        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
