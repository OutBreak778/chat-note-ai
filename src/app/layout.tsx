import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OUTBREAK ',
  description: 'Generated by Nikhil Mishra',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-secondary/60`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Toaster />
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
