import Link from "next/link";
import { getSettings } from "@/sanity/lib/settings";

import Logo from "@/components/layout/Logo";
import SocialLinks from "@/components/layout/SocialLinks";

export default async function Footer() {
  const settings = await getSettings();

  const siteName = settings?.siteName || "The Hair Clique";
  const footerText =
    settings?.footerText ||
    "A bespoke hair sanctuary for wigs and styling. Professional artistry and elite care.";

  const socialLinks = settings?.socialLinks || [];

  const footerLinks = settings?.footerLinks || [];

  return (
    <footer className="py-24 px-6 bg-primary border-t border-primary/20 text-primary-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="text-center space-y-8">
          <Link
            href="/"
            className="text-primary-foreground block"
          >
            <Logo 
              size={settings?.logoConfig?.fontSize || "5xl"} 
              color={settings?.logoConfig?.color} 
              className="md:text-6xl" 
            />
          </Link>
          <p className="text-primary-foreground/70 font-light max-w-sm mx-auto text-sm leading-relaxed tracking-wide pt-4">
            {footerText}
          </p>
        </div>

        <SocialLinks links={socialLinks} />

        <div className="pt-12 w-full border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] font-light text-primary-foreground/50">
          <p className='text-xs'>
            &copy; {new Date().getFullYear()} {siteName}
          </p>
          <div className="flex gap-10">
            {footerLinks.map((link: any, i: number) => (
              <Link
                key={i}
                href={link.href}
                className="hover:text-primary-foreground transition-colors text-xs"
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
