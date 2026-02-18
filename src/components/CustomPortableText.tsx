import Heading from "./ui/Heading";
import Text from "./ui/Text";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <Heading type="h1" className="mb-6">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading type="h2" className="mb-4 mt-8">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading type="h3" className="mb-4 mt-6">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading type="h4" className="mb-2 mt-4">
        {children}
      </Heading>
    ),
    normal: ({ children }) => (
      <Text className="mb-4 text-muted-foreground">{children}</Text>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-accent/40 pl-6 italic text-foreground/80 my-8 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  types: {
    table: ({ value }) => {
      const { rows } = value;
      if (!rows || !rows.length) return null;

      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-border shadow-md bg-white">
          <table className="w-full text-left text-sm border-collapse">
            <tbody className="divide-y divide-border/60">
              {rows.map((row: any, i: number) => (
                <tr
                  key={row._key}
                  className={cn(
                    "group transition-colors",
                    i === 0
                      ? "bg-primary/5 font-bold text-primary"
                      : "hover:bg-accent/5",
                  )}
                >
                  {row.cells.map((cell: string, j: number) => (
                    <td
                      key={j}
                      className={cn(
                        "px-6 py-4",
                        i === 0 ? "text-primary/90" : "text-muted-foreground",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <Text as="span" className="font-semibold text-foreground">
        {children}
      </Text>
    ),
    em: ({ children }) => (
      <Text as="span" variant="brand-secondary" className="italic font-serif">
        {children}
      </Text>
    ),
  },
};

interface CustomPortableTextProps {
  value: any;
  className?: string;
}

export default function CustomPortableText({
  value,
  className,
}: CustomPortableTextProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
