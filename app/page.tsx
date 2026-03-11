import { Hero } from "@/components/shared/Hero";
import { Stats } from "@/components/shared/Stats";
import { FeaturedProjects } from "@/components/shared/FeaturedProjects";
import { Features } from "@/components/shared/Features";
import { Testimonials } from "@/components/shared/Testimonials";
import { Container, Button } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const supabase = await createClient();

  // Fetch some stats, featured projects and testimonials
  const [
    { data: projects },
    { count: projectsCount },
    { count: techCount },
    { count: articlesCount },
    { data: testimonials }
  ] = await Promise.all([
    supabase.from('projects').select('*').limit(3).order('created_at', { ascending: false }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('technologies').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  ]);

  const statsCounts = {
    projects: projectsCount || 45,
    clients: Math.ceil((projectsCount || 45) * 0.7), // Just a dummy logic based on real projects
    tech: techCount || 15,
    articles: articlesCount || 12
  };

  return (
    <>
      <Hero />
      <Stats counts={statsCounts} />
      <Features />
      <FeaturedProjects projects={projects || []} />
      <Testimonials testimonials={testimonials || []} />

      {/* CTA Final */}
      <section className="py-32 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-600/[0.02]" />
        <Container className="relative">
          <div className="max-w-6xl mx-auto text-center space-y-12 bg-slate-900/50 p-16 md:p-32 rounded-[4rem] shadow-2xl relative border border-white/5 glass-card overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-[100px] opacity-50" />

            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                Prêt à lancer votre <br /> <span className="text-gradient">PROJET</span> ?
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                Rejoignez les entreprises qui nous font confiance pour leur transformation digitale. Devis gratuit sous 24h.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 relative z-10">
              <Link href="/contact">
                <Button size="lg" className="h-20 px-12 bg-white text-slate-950 hover:bg-slate-100 shadow-[0_20px_40px_rgba(255,255,255,0.05)] rounded-3xl font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95">
                  Démarrer maintenant
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="h-20 px-10 text-white hover:bg-white/5 rounded-3xl font-black uppercase tracking-widest text-xs border border-white/5 group">
                  En savoir plus
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
