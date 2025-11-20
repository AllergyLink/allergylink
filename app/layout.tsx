import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {

  title: "AllergyLink | All your allergies. One safe link.",

  description:

    "Create and share a single AllergyLink profile so restaurants, schools, and venues can see your allergy and dietary information in seconds.",

};



export default function RootLayout({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <html lang="en">

      <body className="al-body">{children}</body>

    </html>

  );

}
