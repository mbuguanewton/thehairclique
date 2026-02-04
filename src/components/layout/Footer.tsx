import { Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-32 px-6 bg-primary border-t border-primary/20 text-primary-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center space-y-6">
          <Link
            href="/"
            className="text-3xl font-extralight tracking-[0.35em] text-primary-foreground"
          >
            THE HAIR{" "}
            <span className="italic font-serif text-accent">CLIQUE</span>
          </Link>
          <p className="text-primary-foreground/70 font-light max-w-sm mx-auto text-sm leading-relaxed tracking-wide">
            A bespoke hair sanctuary for kids. Home calls and private studio
            sessions available.
          </p>
        </div>

        <div className="flex gap-12">
          <a
            href="#"
            className="text-primary-foreground/80 hover:text-accent transition-all duration-300 transform hover:scale-110"
          >
            <Instagram className="w-6 h-6 stroke-1" />
          </a>
          <a
            href="#"
            className="text-primary-foreground/80 hover:text-accent transition-all duration-300 transform hover:scale-110"
          >
            <Facebook className="w-6 h-6 stroke-1" />
          </a>
          <a
            href="#"
            className="text-primary-foreground/80 hover:text-accent transition-all duration-300 transform hover:scale-110"
          >
            <Mail className="w-6 h-6 stroke-1" />
          </a>
        </div>

        <div className="pt-12 w-full border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] font-light text-primary-foreground/50">
          <p>&copy; 2026 The Hair Clique</p>
          <div className="flex gap-10">
            <Link
              href="/privacy"
              className="hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
