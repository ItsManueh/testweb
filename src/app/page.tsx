import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { FloatingHearts, GlowBackground } from "@/components/Background";
import { CursorHeart } from "@/components/CursorHeart";
import { LinkCard } from "@/components/LinkCard";
import { links, site } from "@/config/site";

export default function Home() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <GlowBackground />
      <FloatingHearts count={8} />
      <CursorHeart />

      <main className="relative z-10">
        <section className="mx-auto max-w-xl px-5 pt-16 text-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${site.avatar}`}
            width={560}
            height={560}
            alt={site.avatarAlt}
            loading="eager"
            fetchPriority="high"
            className="glow-ring mx-auto size-44 rounded-full border-2 border-border/70 object-cover"
          />
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight">
            <span className="text-neon">{site.name}</span>
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {site.handle}
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-xl px-5">
          <div className="space-y-3">
            {links.map((item) => (
              <LinkCard key={item.href} item={item} />
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
            <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
            {site.disclaimer}
          </p>
        </section>
      </main>

      <footer className="relative z-10 mt-16 pb-12 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · {site.footerNote}
        </p>
      </footer>
    </div>
  );
}
