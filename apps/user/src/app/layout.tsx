import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@oms/ui/styles.css";
import Providers from "@oms/ui/providers/provider";
// import Navbar from "@oms/ui/components/Navbar";
// import { Role } from "@oms/types/user.type";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "OMS",
  description: "oms.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {/* <Navbar role={Role.CUSTOMER} /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
