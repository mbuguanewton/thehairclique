import { Instagram, Facebook, Mail, Twitter, Send } from "lucide-react";
import Link from "next/link";
import { getSettings } from "@/sanity/lib/settings";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  tiktok: Send, // Lucide doesn't have tiktok, using send as placeholder or check others
  email: Mail,
};

export default async function Footer() {
  const settings = await getSettings();

  const siteName = settings?.siteName || "The Hair Clique";
  const footerText =
    settings?.footerText ||
    "A bespoke hair sanctuary for wigs and styling. Professional artistry and elite care.";

  const socialLinks = settings?.socialLinks || [
    { platform: "instagram", url: "#" },
    { platform: "facebook", url: "#" },
    { platform: "email", url: "mailto:info@thehairclique.com" },
  ];

  const footerLinks = settings?.footerLinks || [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="py-32 px-6 bg-primary border-t border-primary/20 text-primary-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center space-y-6">
          <Link
            href="/"
            className="text-3xl font-extralight tracking-[0.35em] text-primary-foreground"
          >
            {siteName
              .toUpperCase()
              .split(" ")
              .map((word: string, i: number) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="italic font-serif text-accent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
          </Link>
          <p className="text-primary-foreground/70 font-light max-w-sm mx-auto text-sm leading-relaxed tracking-wide">
            {footerText}
          </p>
        </div>

        <div className="flex gap-12">
          {socialLinks.map((link: any, i: number) => {
            const Icon = iconMap[link.platform] || Mail;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-accent transition-all duration-300 transform hover:scale-110"
              >
                <Icon className="w-6 h-6 stroke-1" />
              </a>
            );
          })}
        </div>

        <div className="pt-12 w-full border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] font-light text-primary-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} {siteName}
          </p>
          <div className="flex gap-10">
            {footerLinks.map((link: any, i: number) => (
              <Link
                key={i}
                href={link.href}
                className="hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
