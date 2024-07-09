import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rip Cord",
  description: "An app that works on any EVM compatiable blockchain and allows you to load all available functions and call them. Generated with love ❤️ from Drac",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
