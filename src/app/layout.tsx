import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { ToastProvider } from "@/components/common/Toast";

export const metadata: Metadata = {
  title: "KTOON",
  description: "이야기에 빠져드는 가장 깊은 공간",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-wt-bg text-wt-text min-h-screen transition-colors duration-200">
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
