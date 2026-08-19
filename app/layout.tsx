import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zeltrix.com"),
  title: {
    default: "ZELTRIX | Startup Technologique & Ingénierie Logicielle",
    template: "%s | ZELTRIX",
  },
  description: "Conception et développement de solutions logicielles de pointe : applications Web, Mobiles, Cloud, ERP sur mesure, SaaS et Intelligence Artificielle.",
  keywords: [
    "ZELTRIX",
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
  authors: [{ name: "ZELTRIX Team", url: "https://zeltrix.com" }],
  creator: "ZELTRIX",
  publisher: "ZELTRIX Technologies",
  openGraph: {
    title: "ZELTRIX | Startup Technologique & Ingénierie Logicielle",
    description: "Nous transformons des visions d'entreprise complexes en plateformes numériques performantes et évolutives.",
    url: "https://zeltrix.com",
    siteName: "ZELTRIX",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZELTRIX | Startup Technologique",
    description: "Développement logiciel sur mesure : Web, Mobile, ERP, SaaS, Cloud & IA.",
    creator: "@zeltrix",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#050811" },
  ],
};

/**
 * Applique le thème avant le premier rendu peint pour éviter tout flash de
 * thème clair et garder <html> synchronisé avec la préférence enregistrée.
 */
const themeInitScript = `(function(){try{var s=localStorage.getItem('zeltrix-theme');var t=(s==='dark'||s==='light')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZELTRIX",
    "url": "https://zeltrix.com",
    "logo": "https://zeltrix.com/favicon.ico",
    "description": "Startup technologique spécialisée en ingénierie logicielle, développement web, mobile, SaaS, ERP et intelligence artificielle.",
    "sameAs": [
      "https://linkedin.com/company/zeltrix",
      "https://github.com/zeltrix",
      "https://twitter.com/zeltrix"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@zeltrix.com",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    }
  };

  return (
    <html lang="fr" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground selection:bg-blue-600 selection:text-white`}>
        <ThemeProvider>
          <SiteChrome navbar={<Navbar />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
