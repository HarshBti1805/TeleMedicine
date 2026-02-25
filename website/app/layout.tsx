import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arogyam - Healthcare Management",
  description: "Professional telemedicine platform for healthcare professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <body className="antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
