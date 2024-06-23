import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Journey Capturer : Capture Every Step of Your Learning Journey",
  description:
    "The Journey Capturer is a dynamic LMS platform designed to guide and track your educational journey. Capture every step, celebrate achievements, and personalize your learning path with our intuitive and engaging tools. Start your journey today!",
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
