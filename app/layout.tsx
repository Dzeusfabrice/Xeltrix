import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xeltrix.com"),
  title: {
    default: "XELTRIX | Startup Technologique & Ingénierie Logicielle",
    template: "%s | XELTRIX",
  },
  description: "Conception et développement de solutions logicielles de pointe : applications Web, Mobiles, Cloud, ERP sur mesure, SaaS et Intelligence Artificielle.",
  keywords: [
    "XELTRIX",
    "startup technologique",
    "développement web",
    "application mobile",
    "logiciel SaaS",
    "ERP sur mesure",
    "intelligence artificielle",
    "DevOps",
    "ingénierie logicielle",
    "développeur Next.js",
  ],
  authors: [{ name: "XELTRIX Team", url: "https://xeltrix.com" }],
  creator: "XELTRIX",
  publisher: "XELTRIX Technologies",
  openGraph: {
    title: "XELTRIX | Startup Technologique & Ingénierie Logicielle",
    description: "Nous transformons des visions d'entreprise complexes en plateformes numériques performantes et évolutives.",
    url: "https://xeltrix.com",
    siteName: "XELTRIX",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XELTRIX | Startup Technologique",
    description: "Développement logiciel sur mesure : Web, Mobile, ERP, SaaS, Cloud & IA.",
    creator: "@xeltrix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "XELTRIX",
    "url": "https://xeltrix.com",
    "logo": "https://xeltrix.com/favicon.ico",
    "description": "Startup technologique spécialisée en ingénierie logicielle, développement web, mobile, SaaS, ERP et intelligence artificielle.",
    "sameAs": [
      "https://linkedin.com/company/xeltrix",
      "https://github.com/xeltrix",
      "https://twitter.com/xeltrix"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@xeltrix.com",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    }
  };

  return (
    <html lang="fr" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-blue-600 selection:text-white`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
