import Image from "next/image";
import { Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-primary text-primary-foreground selection:bg-accent/30 overflow-hidden">
      {/* MINERVA-style split layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
        {/* Left: Content */}
        <div className="space-y-12 text-left">
          <header className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full backdrop-blur-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-accent">
                Coming 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-[5rem] font-extralight tracking-[-0.04em] leading-[0.85] text-white">
              The <br />
              <span className="italic font-serif text-accent">Hair Clique</span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/80 font-light max-w-lg leading-relaxed tracking-wide">
              A bespoke{" "}
              <span className="text-white italic font-serif underline decoration-accent/40 decoration-2 underline-offset-8">
                hair sanctuary
              </span>{" "}
              for kids. Professional artistry delivered with care.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <Link
              href="https://www.instagram.com/the_hairclique?igsh=MTN6djRieWhpaTAxZQ%3D%3D&utm_source=qr"
              className="inline-flex items-center justify-center bg-white text-primary px-10 py-5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl"
            >
              See our work
            </Link>

            <div className="flex gap-8">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 stroke-1" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-accent transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 stroke-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Featured Image with MINERVA-style accents */}
        <div className="relative group lg:block hidden">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-2xl">
            <Image
              src="/coming-soon-bg.png"
              alt="Kids Braiding Services"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
          </div>

          <div className="absolute top-10 -right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] shadow-2xl group-hover:translate-x-4 transition-transform duration-700">
            <div className="w-12 h-1 bg-accent mb-4" />
            <p className="text-xs uppercase tracking-[0.2em] text-white">
              Bespoke <br /> Artistry
            </p>
          </div>

          {/* Circular badge accent */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
            <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Text Pattern (Background) */}
      <div className="absolute bottom-[-5%] right-[-5%] opacity-5 pointer-events-none select-none lg:block hidden">
        <span className="text-[30rem] font-serif italic tracking-tighter leading-none pr-10">
          Clique
        </span>
      </div>
    </main>
  );
}
