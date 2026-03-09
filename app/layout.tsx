import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XELTRIX | Startup Technologique Innovante",
  description: "Xeltrix est spécialisée dans le développement de solutions logicielles innovantes, applications mobiles, web et desktop.",
  keywords: ["startup", "tech", "software development", "innovation", "digital solutions"],
  authors: [{ name: "Xeltrix Team" }],
  openGraph: {
    title: "XELTRIX | Startup Technologique",
    description: "Solutions logicielles innovantes pour entreprises modernes.",
    type: "website",
    locale: "fr_FR",
    siteName: "Xeltrix",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background`}>
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
