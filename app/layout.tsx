import type { Metadata, Viewport } from "next";

import "./globals.css";
import PWAWrapper from "@/components/PWAWrapper";



export const metadata: Metadata = {

  title: "AllergyLink | All your allergies. One safe link.",

  description:

    "Create and share a single AllergyLink profile so restaurants, schools, and venues can see your allergy and dietary information in seconds.",

  manifest: "/manifest.json",

  appleWebApp: {

    capable: true,

    statusBarStyle: "default",

    title: "AllergyLink",

  },

  formatDetection: {

    telephone: false,

  },

  icons: {

    icon: "/icons/icon-192.png",

    apple: "/icons/icon-192.png",

  },

};



export const viewport: Viewport = {

  themeColor: "#0B59CF",

  width: "device-width",

  initialScale: 1,

  maximumScale: 5,

  userScalable: true,

};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body className="al-body">
        {children}
        <PWAWrapper />
      </body>

    </html>

  );

}
