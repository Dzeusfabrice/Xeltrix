import { Hero } from "@/components/shared/Hero";
import { Stats } from "@/components/shared/Stats";
import { FeaturedProjects } from "@/components/shared/FeaturedProjects";
import { Features } from "@/components/shared/Features";
import { Container, Button } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <FeaturedProjects />

      {/* CTA Final */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-primary p-12 md:p-20 rounded-[3rem] shadow-2xl relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl" />

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Prêt à lancer votre prochain projet ?
            </h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">
              Rejoignez les entreprises qui nous font confiance pour leur transformation digitale. Devis gratuit sous 24h.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  Démarrer maintenant
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="text-slate-950 hover:bg-white/20">
                  En savoir plus
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
