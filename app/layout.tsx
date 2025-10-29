// app/layout.tsx
import "@styles/globals.css";
import { Roboto } from "next/font/google";
import Script from "next/script";
import AppShell from "@/components/AppShell";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata = {
  title: "Kornvik Tanpipat",
  description: "Portfolio & blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Script
          src="https://cdn.jsdelivr.net/npm/kute.js@2.1.2/dist/kute.min.js"
          strategy="lazyOnload"
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
