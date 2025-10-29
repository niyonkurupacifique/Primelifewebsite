import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSInit from "@/components/AOSInit";
import ReduxProvider from "@/components/ReduxProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime Life Website",
  description: "Official Prime Life  Website'",
  icons: {
    icon: "/favicon.png", // your favicon in the public folder
    apple: "/favicon.png", // optional for iOS devices
    shortcut: "/favicon.png", // optional for Windows / pinned tabs
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AOSInit />
          {children}
        </ReduxProvider>
         {/* Proto.cx Livechat Widget */}
        <Script
          id="proto-livechat"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.protoSettings = {
                id: '01J9XKWAARGCDM93BJFJ3XVFCK'
              };

              var prs = document.createElement('script');
              prs.src = 'https://embed.proto.cx/index.umd.js';
              prs.type = 'text/javascript';
              prs.async = true;
              prs.onload = function () {
                window.proto.init(window.protoSettings);
              };
              document.head.appendChild(prs);
            `,
          }}
        />
      </body>
    </html>
  );
}
