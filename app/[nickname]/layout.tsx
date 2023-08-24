import "@/styles/globals.css";
import cx from "classnames";
import { sfPro, inter } from "@/styles/fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Nice to meet you",
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
    <div className={cx(sfPro.variable, inter.variable)}>
      <div className="fixed h-screen w-full bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100" />
      <main className="flex min-h-screen w-full flex-col items-center">
        {children}
      </main>
    </div>
  );
}
