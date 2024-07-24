import type { Metadata } from "next";
import { Akshar } from "next/font/google";
import "./globals.css";

const inter = Akshar({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background"/>
        {children}  
      </body>
    </html>
  );
}
