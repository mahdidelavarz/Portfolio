"use client";
import React from 'react';
import Link from 'next/link';
import GoBackButton from '@/components/GoBackBtn';
import { HomeIcon } from '@/icons/icons';

// Define metadata for the 404 page
// export const metadata: Metadata = {
//   title: "Page Not Found | Mahdi Delavar - Frontend Developer",
//   description: "The page you are looking for does not exist. Return to Mahdi Delavar's portfolio - React, Next.js, and TypeScript Frontend Developer.",
//   robots: {
//     index: false,
//     follow: false,
//     googleBot: {
//       index: false,
//       follow: false,
//     },
//   },
//   alternates: {
//     canonical: "https://mahdidelavar.ir",
//   },
// };

export default function NotFound() {
  // Structured data for 404 page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404 - Page Not Found",
    url: "https://mahdidelavar.ir/404",
    description: "The requested page was not found on Mahdi Delavar's Frontend Developer Portfolio.",
    mainEntity: {
      "@type": "Thing",
      name: "404 Error",
      description: "This page could not be found"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://mahdidelavar.ir"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "404 Not Found"
        }
      ]
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://mahdidelavar.ir/#website",
      url: "https://mahdidelavar.ir",
      name: "Mahdi Delavar - Frontend Developer Portfolio",
      publisher: {
        "@type": "Person",
        name: "Mahdi Delavar",
        jobTitle: "Frontend Developer",
        url: "https://mahdidelavar.ir"
      }
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <HomeIcon width='10' height='10' className='text-black'  />
              Go Home
            </Link>

            <GoBackButton />
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-8 opacity-50">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Suggestions with better keywords */}
          <div className="mt-12 text-slate-500 text-sm">
            <p className="mb-2">Return to explore:</p>
            <ul className="space-y-1">
              <li>React and Next.js projects</li>
              <li>Frontend development portfolio</li>
              <li>TypeScript web applications</li>
            </ul>
          </div>
        </div>

        {/* Background decoration */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </>
  );
}