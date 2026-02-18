import Link from "next/link";
import { cn } from "@/lib/utils";
import { getSettings } from "@/sanity/lib/settings";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default async function Navbar() {
  const settings = await getSettings();
  const navLinks = settings?.navLinks || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Booking", href: "/booking" },
    { label: "Showcase", href: "/showcase" },
    { label: "Blog", href: "/blog" },
  ];

  const siteName = settings?.siteName || "The Hair Clique";
  const logo = settings?.logo;

  // Split links for the center logo layout
  const midPoint = Math.ceil(navLinks.length / 2);
  const leftLinks = navLinks.slice(0, midPoint);
  const rightLinks = navLinks.slice(midPoint);

  return (
    <nav className="w-full z-50 bg-primary border-b border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex-1 hidden md:flex items-center gap-8">
          {leftLinks.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 hover:text-accent transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="flex-none flex items-center gap-4 text-2xl font-extralight text-primary-foreground group"
        >
          {logo ? (
            <div className="relative w-12 h-12">
              <Image
                src={urlForImage(logo).url()}
                alt={siteName}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <p>
              {siteName.split(" ").map((word: string, i: number) => (
                <span
                  key={i}
                  className={cn(
                    i === 1
                      ? "italic font-serif text-accent group-hover:text-primary-foreground transition-colors"
                      : "",
                  )}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          )}
        </Link>

        <div className="flex-1 hidden md:flex items-center justify-end gap-8">
          {rightLinks.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.4em] text-primary-foreground/70 hover:text-accent transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button className="text-primary-foreground">
            <span className="sr-only">Menu</span>
            <div className="w-6 h-px bg-current mb-1.5" />
            <div className="w-6 h-px bg-current" />
          </button>
        </div>
      </div>
    </nav>
  );
}
