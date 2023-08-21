import "../styles/globals.css";
import cx from "classnames";
import { sfPro, inter } from "../styles/fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Script from "next/script";

export const metadata = {
  title: "MeetU",
  description: "...",
  metadataBase: new URL("https://meetu.dev"),
  themeColor: "#FFF",
  icons: {
    // <head><link/></head>
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MJ79QL6TXQ"
        ></Script>
      </head>

      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-yellow-100" />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
