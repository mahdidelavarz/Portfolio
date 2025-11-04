import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://mahdidelavar.ir"),
    title: {
      default: "Mahdi Delavar | Frontend Developer - React & Next.js",
      template: "%s | Mahdi Delavar",
    },
    description:
      "Frontend Developer specializing in React, Next.js, and TypeScript. 3+ years of experience building scalable web apps.",
    keywords: [
      "Frontend Developer",
      "React Developer",
      "Next.js Expert",
      "TypeScript Developer",
      "JavaScript Developer",
      "UI/UX Engineer",
      "Web Developer",
      "Full Stack Developer",
      "Mahdi Delavar",
      "Portfolio",
      "Web Development",
      "Software Engineer",
      "Tehran Developer",
      "Iran Developer",
      "Freelance Developer",
      "Remote Developer",
    ],
    authors: [
      {
        name: "Mahdi Delavar",
        url: "https://mahdidelavar.ir",
      },
    ],
    creator: "Mahdi Delavar",
    publisher: "Mahdi Delavar",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://mahdidelavar.ir",
      siteName: "Mahdi Delavar - Frontend Developer Portfolio",
      title: "Mahdi Delavar | Frontend Developer Portfolio",
      description:
        "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies. View my projects and experience.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Mahdi Delavar - Frontend Developer Portfolio",
          type: "image/png",
        },
        {
          url: "/og-image-alt.png",
          width: 1200,
          height: 630,
          alt: "Mahdi Delavar Portfolio Preview",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mahdi Delavar - Frontend Developer Portfolio",
      description:
        "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies.",
      creator: "@mahdi_delavar",
      site: "@mahdi_delavar",
      images: ["/twitter-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://mahdidelavar.ir",
      languages: {
        "en-US": "https://mahdidelavar.ir",
        "fa-IR": "https://mahdidelavar.ir/fa",
      },
    },
    category: "technology",
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
      other: {
        me: ["mdelever77@gmail.com", "https://github.com/mahdidelavarz"],
      },
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/favicon4.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
          color: "#0ea5e9",
        },
      ],
    },
    appleWebApp: {
      capable: true,
      title: "Mahdi Delavar Portfolio",
      statusBarStyle: "black-translucent",
    },
    applicationName: "Mahdi Delavar Portfolio",
    referrer: "origin-when-cross-origin",
    classification: "Portfolio, Developer, Frontend, React, Next.js",
    generator: "Next.js",
    archives: ["https://mahdidelavar.ir/archive"],
    assets: ["https://mahdidelavar.ir/assets"],
    other: {
      "ld+json": [
        // WebPage Schema with embedded Person as mainEntity
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Mahdi Delavar Portfolio",
          url: "https://mahdidelavar.ir",
          description: "Frontend Developer Portfolio showcasing projects and skills",
          mainEntity: {
            "@type": "Person",
            "@id": "https://mahdidelavar.ir/#person",
            name: "Mahdi Delavar",
            alternateName: "Mahdi",
            description:
              "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies",
            image: "https://mahdidelavar.ir/profile-image.jpg",
            url: "https://mahdidelavar.ir",
            email: "mdelever77@gmail.com",
            telephone: "+989123456789",
            jobTitle: "Frontend Developer",
            worksFor: {
              "@type": "Organization",
              name: "Petco",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Your University",
            },
            knowsAbout: [
              "Frontend Development",
              "React.js",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "UI/UX Design",
              "Web Development",
              "Software Engineering",
            ],
            sameAs: [
              "https://github.com/mahdidelavarz",
              "https://linkedin.com/in/mahdi-delavar",
              "https://twitter.com/mahdi_delavar",
              "https://t.me/mahdi_delavar",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tehran",
              addressCountry: "Iran",
            },
            nationality: "Iranian",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://mahdidelavar.ir",
            },
          },
        }),
        // BreadcrumbList Schema
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://mahdidelavar.ir",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About",
              item: "https://mahdidelavar.ir#aboutme",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Projects",
              item: "https://mahdidelavar.ir#projects",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Contact",
              item: "https://mahdidelavar.ir#contactme",
            },
          ],
        }),
        // WebSite Schema
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://mahdidelavar.ir/#website",
          url: "https://mahdidelavar.ir",
          name: "Mahdi Delavar Portfolio",
          description: "Frontend Developer Portfolio showcasing projects and skills",
          publisher: {
            "@id": "https://mahdidelavar.ir/#person",
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://mahdidelavar.ir/?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          inLanguage: "en-US",
        }),
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Additional SEO meta tags */}
        <meta name="author" content="Mahdi Delavar" />
        <meta name="copyright" content="© 2024 Mahdi Delavar" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IR-07" />
        <meta name="geo.placename" content="Tehran" />
        <meta name="geo.position" content="35.6892;51.3890" />
        <meta name="ICBM" content="35.6892, 51.3890" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mahdidelavar.ir" />

        {/* Alternative formats */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom"
          href="/atom.xml"
        />
      </head>
      <body className="font-sans antialiased bg-slate-900 text-white">
        {children}
      </body>
    </html>
  );
}