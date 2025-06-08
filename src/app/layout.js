import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import { UserProvider } from "@/components/context/UserProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paywall Education Platform",
  keywords: "paywall, education, platform, courses, subscription",
  description:
    "LearnToday is a paywall education platform offering a wide range of courses with subscription-based access. Join us to enhance your skills and knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <Navigation />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
