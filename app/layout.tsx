import CartContextProvider from "@/contexts/CartContextProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import SizesProvider from "@/contexts/SizesProvider";

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
    <html lang="en">
      <body className="bg-gray-900">
        <CartContextProvider>
          <SizesProvider>{children}</SizesProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
