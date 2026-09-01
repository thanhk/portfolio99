import type { Metadata } from "next";
import { VT323, Courier_Prime } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Ticker from "@/components/Ticker";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

// Loaded for the font trial in the sidebar. Once a set is chosen, the unused
// families come back out.
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

// These classes must sit on <html>, not <body>: the palette blocks declare
// --font-body on :root, and a custom property's var() references resolve on the
// element that declares it. On <body> the families would be invisible to :root
// and every font would fall back.
const fontVars = `${vt323.variable} ${courierPrime.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://thanhk.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Steven Khuu - Portfolio",
    template: "%s | Steven Khuu"
  },
  description: "Steven Khuu (thanhk), a Software Engineer. Enjoys building and learning.",
  keywords: ["Steven Khuu", "thanhk", "Steven Khuu portfolio", "thanhk portfolio", "thanhk99", "software engineer", "backend developer", "Visa Inc", "UTD", "University of Texas at Dallas"],
  authors: [{ name: "Steven Khuu" }],
  creator: "Steven Khuu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thanhk.com",
    siteName: "Steven Khuu Portfolio",
    title: "Steven Khuu - Portfolio",
    description: "Steven Khuu (thanhk), a Software Engineer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steven Khuu - Portfolio",
    description: "Steven Khuu (thanhk), a Software Engineer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Applies the font set being trialled before paint. Goes away with the
            picker once a set is chosen. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var f=localStorage.getItem('thanhk-font');if(f)document.documentElement.dataset.font=f;}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AnimatedBackground />
        <div className="screen">
          <header className="masthead">
            <Link href="/" className="wordmark">thanhk.com</Link>
            <div className="sub">the personal site of steven khuu</div>
          </header>
          <Ticker />
          <div className="layout">
            <Sidebar />
            <main>
              {children}
            </main>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
