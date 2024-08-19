import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Junior Fullstack Exam",
  description: "Exam for Junior Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-cover flex flex-col lg:flex-row items-center px-5 lg:px-20 gap-5 justify-center font-sans h-screen bg-[url('/images/bg.jpg')]">
          <Nav />

          <div className="bg-gray-600/5 border h-min border-gray-600 py-6 px-4 drop-shadow-xl shadow-black  backdrop-blur-3xl backdrop-brightness-95 container mx-auto rounded-3xl overflow-hidden">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
