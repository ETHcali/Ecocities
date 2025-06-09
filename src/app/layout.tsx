import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoCity PPY Token Dashboard",
  description: "Transforming urban waste into digital value - EcoCity PPY Token Dashboard",
  keywords: ["blockchain", "token", "environmental", "smart-cities", "waste-management", "sustainability"],
  authors: [{ name: "EKINOXIS" }],
  openGraph: {
    title: "EcoCity PPY Token Dashboard",
    description: "Transforming urban waste into digital value",
    url: "https://ecocities.ethcali.org",
    siteName: "EcoCity PPY Dashboard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
