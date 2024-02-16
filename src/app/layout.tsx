import type { Metadata } from "next";
 
import "./globals.css";

 

export const metadata: Metadata = {
  title: "Player Audio",
  description: "just to discover the audio control in the browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
