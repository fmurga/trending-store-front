import CartContextProvider from "@/contexts/CartContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import SizesProvider from "@/contexts/SizesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Clothes shop",
  description: "Clothes shop using Next and Node api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartContextProvider>
      <SizesProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SizesProvider>
    </CartContextProvider>
  );
}
