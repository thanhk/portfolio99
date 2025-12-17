import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "../styles/globals.css";
import Navigation from "@/components/Navigation";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "thanhk99",
  description: "thanhk99's Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={vt323.variable}>
        <Navigation />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
