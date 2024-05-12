import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { Protect } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

import "../globals.css";
import Forbidden from "@/components/layouts/Forbidden";
import ClerkVIProvider from "@/lib/providers/ClerkVIProvider";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Layout from "@/components/layouts/Layout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Writer Hub",
  description: "Writer dashboard to manage ReadNovels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkVIProvider>
      <html lang="vi" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ToasterProvider />
          <Protect
            permission="org:writer:create"
            fallback={<Forbidden />}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Layout>{children}</Layout>
            </ThemeProvider>
          </Protect>
        </body>
      </html>
    </ClerkVIProvider>
  );
}
