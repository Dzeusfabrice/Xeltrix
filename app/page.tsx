import { Hero } from "@/components/shared/Hero";
import { Stats } from "@/components/shared/Stats";
import { ServicesOverview } from "@/components/shared/ServicesOverview";
import { ProductsPreview } from "@/components/shared/ProductsPreview";
import { FeaturedProjects } from "@/components/shared/FeaturedProjects";
import { CaseStudiesSection } from "@/components/shared/CaseStudiesSection";
import { Features } from "@/components/shared/Features";
import { Testimonials } from "@/components/shared/Testimonials";
import { CTASection } from "@/components/shared/CTASection";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const supabase = await createClient();

  // Fetch stats, featured projects and testimonials safely
  const [
    { data: projects },
    { count: projectsCount },
    { count: techCount },
    { count: articlesCount },
    { data: testimonials },
    { data: services },
    { data: products }
  ] = await Promise.all([
    supabase.from('projects').select('*').limit(3).order('created_at', { ascending: false }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('technologies').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
    supabase.from('services').select('*').eq('status', 'published').order('sort_order', { ascending: true }),
    supabase.from('products').select('*').eq('status', 'published').order('sort_order', { ascending: true }),
  ]);

  const statsCounts = {
    projects: projectsCount || 45,
    clients: Math.ceil((projectsCount || 45) * 0.7) || 32,
    tech: techCount || 20,
    articles: articlesCount || 12
  };

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Hero />
      <Stats counts={statsCounts} />
      <ServicesOverview services={services || []} />
      <ProductsPreview products={products || []} />
      <FeaturedProjects projects={projects || []} />
      <CaseStudiesSection />
      <Features />
      <Testimonials testimonials={testimonials || []} />
      <CTASection />
    </div>
  );
}
