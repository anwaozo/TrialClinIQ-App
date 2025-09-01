import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const instru_Sans = Instrument_Sans({
  variable: "--font-instru-sans",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Trail Cliniq | Sign In",
  description:
    "AI-driven clinical trial matches built around your health data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instru_Sans.variable} antialiased`}>
       
        {children}
      </body>
    </html>
  );
}
