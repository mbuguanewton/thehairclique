import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Booking", href: "/booking" },
    { label: "Showcase", href: "/showcase" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-primary border-b border-primary/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex-1 hidden md:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
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
          className="flex-none text-2xl font-extralight tracking-[0.3em] text-primary-foreground group"
        >
          THE HAIR{" "}
          <span className="italic font-serif text-accent group-hover:text-primary-foreground transition-colors">
            CLIQUE
          </span>
        </Link>

        <div className="flex-1 hidden md:flex items-center justify-end gap-8">
          {navLinks.slice(2).map((link) => (
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
