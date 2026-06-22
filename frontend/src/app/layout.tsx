import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Reform İnovasyon Yapı | Geleceği İnşa Ediyoruz",
    template: "%s | Reform İnovasyon Yapı",
  },
  description:
    "Reform İnovasyon Yapı, inşaat sektöründe yenilikçi projeleriyle geleceği inşa ediyor. Kaba inşaat, iç mekan, dış cephe, mobilya ve danışmanlık hizmetleri.",
  openGraph: {
    title: "Reform İnovasyon Yapı",
    description: "Geleceği İnşa Ediyoruz",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600;800;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
                <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
