import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "資産トラッカー",
  description: "金・ロレックスなどの資産を登録し、相場と売り時をひと目で確認できるアプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <header className="border-b border-hairline bg-paper/80 backdrop-blur">
          <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-5">
            <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
              資産トラッカー
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-[1080px] px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
