import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juprobe | Jupiter API Diagnostics",
  description: "API stress-test probe for Jupiter endpoints.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Juprobe | Jupiter API Diagnostics",
    description: "API stress-test probe for Jupiter endpoints.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Juprobe Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juprobe | Jupiter API Diagnostics",
    description: "API stress-test probe for Jupiter endpoints.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-green-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
