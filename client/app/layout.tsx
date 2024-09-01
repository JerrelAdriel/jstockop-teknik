import type { Metadata } from "next";
import './globals.css'
import { NextUIProvider } from "@nextui-org/react";
import Providers from "./components/ProgressBarProvider";

export const metadata: Metadata = {
  title: "Teknik Belawan Stock Op",
  description: "Pelindo Branch Belawan Divisi Teknik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
        <Providers>
          {children}
        </Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
