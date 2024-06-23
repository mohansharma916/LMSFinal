import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduAir- Education in Air",
  description:
    " Experience the future of online education with our innovative Learning Management System. Accessible, interactive, and cloud-based, EduAir is your gateway to effortless learning. Join now and take your education to new heights!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut> */}
            {/* <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          <main>
            <ToastProvider />
            {children}
            {/* <p>hi</p> */}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
