import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "База знаний -- Типография Сити Принт",
    template: "%s -- Сити Принт",
  },
  description: "Всё о полиграфии: от выбора бумаги до получения тиража. Статьи технологов типографии с 20-летним опытом.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
