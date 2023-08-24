import "@/styles/globals.css";
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
        {/* Google Analytics */}
        <Script
          async
          id="googletagmanager-a"
          src="https://www.googletagmanager.com/gtag/js?id=G-MJ79QL6TXQ"
        ></Script>
        <Script
          async
          id="googletagmanager-b"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MJ79QL6TXQ');
              `,
          }}
        ></Script>
      </head>
      <body className={cx(sfPro.variable, inter.variable)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
