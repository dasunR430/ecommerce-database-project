
import "./globals.css";
import { Kumbh_Sans } from "next/font/google";
import Cart from "../components/cart";

import CartProvider from "../components/cartProvider";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Frontend Mentor | E-commerce product page",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>
        <CartProvider>
          <div className="container">
            {children}
            <Cart />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}