import "@/globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Juice Shop",
  description: "Secured version of Juice Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen pt-2 antialiased">
        <Providers>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
