import "./globals.css";
import type { Metadata, Viewport } from "next";





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

export const metadata: Metadata = {
  metadataBase: new URL("https://mahdidelavar.ir"),
  title: {
    default: "Mahdi Delavar | Frontend Developer",
    template: "%s | Mahdi Delavar",
  },
  description:
    "Frontend Developer building maintainable React and TypeScript systems for enterprise and data-intensive applications.",
  keywords: [
    "Mahdi Delavar",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Tabriz",
    "Remote Frontend Developer",
  ],
  authors: [{ name: "Mahdi Delavar", url: "https://mahdidelavar.ir" }],
  creator: "Mahdi Delavar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mahdidelavar.ir",
    siteName: "Mahdi Delavar",
    title: "Mahdi Delavar | Frontend Developer",
    description:
      "Frontend Developer building maintainable React and TypeScript systems for enterprise and data-intensive applications.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon4.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/favicon4.png", sizes: "512x512", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Mahdi Delavar",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Mahdi Delavar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-slate-900 text-white">
        {children}
      </body>
    </html>
  );
}
