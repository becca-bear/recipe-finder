import "./globals.css"
import type { Metadata } from "next"
import { Lora } from "next/font/google"
import type React from "react"

const lora = Lora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find delicious recipes with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <header className="bg-primary text-primary-foreground py-4">
          <h1 className="text-4xl font-bold text-center">Recipe Finder</h1>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

