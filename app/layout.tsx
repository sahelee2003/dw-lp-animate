import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DW — Digital Wolf | Business-First Digital Growth",
  description:
    "We connect strategy, performance media, creative, data and technology to help businesses attract better customers and convert attention into commercial momentum.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="bg-[#ffffff] font-sans text-[#000000] antialiased selection:bg-[#000000] selection:text-[#ffffff]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
