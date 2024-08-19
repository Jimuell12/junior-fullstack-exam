import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          <div className="bg-gray-600/5 border rounded-full lg:space-y-5 text-white border-gray-600/75 py-6 px-4 drop-shadow-xl shadow-black backdrop-blur-3xl backdrop-brightness-95 flex flex-row gap-5 lg:flex-col items-center">
            <a
              className="rounded-full p-2 bg-gray-600/10 cursor-pointer hover:bg-gray-600/20 transition-colors duration-200"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>

            <a
              className="rounded-full p-2 cursor-pointer hover:bg-gray-600/20 transition-colors duration-200"
              href="/create-item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </a>
          </div>

          <div className="bg-gray-600/5 border h-min border-gray-600 py-6 px-4 drop-shadow-xl shadow-black  backdrop-blur-3xl backdrop-brightness-95 container mx-auto rounded-3xl overflow-hidden">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
