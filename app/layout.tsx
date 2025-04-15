import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Megrim } from 'next/font/google';
import BackgroundLayout from "@/components/layouts/BackgroundLayout";

const megrim = Megrim({
  subsets: ['latin'],
  weight: '400', 
  display: 'swap',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sajjad Mahmoodi | Frontend Developer",
  description: "Frontend Developer specializing in modern web applications",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${megrim.className}`}
      >
        <BackgroundLayout>
          {children}
        </BackgroundLayout>
      </body>
    </html>
  );
}
