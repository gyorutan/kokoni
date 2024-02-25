import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kokoni",
  description: "みんなのものは「ココニ」",
  icons: {
    icon: ["image/png", "/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster toastOptions={{ duration: 2000, position: "top-center" }} />
        {children}
      </body>
    </html>
  );
}
