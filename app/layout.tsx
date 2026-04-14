import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: {
    default: "Innovation Brindes",
    template: "%s | Innovation Brindes",
  },
  description:
    "Aplicação de login e listagem de produtos desenvolvida como teste técnico utilizando Next.js, React Query e Zustand.",
  keywords: [
    "Next.js",
    "React",
    "Frontend",
    "Produtos",
    "Innovation Brindes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}