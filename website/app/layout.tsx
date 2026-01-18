import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synapse-TeleMedicine - Doctors Portal",
  description: "Comprehensive telemedicine platform for healthcare professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
