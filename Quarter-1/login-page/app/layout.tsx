import type { Metadata } from "next"
import { sora } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased`}>{children}</body>
    </html>
  )
}
