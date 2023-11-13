import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Inter } from 'next/font/google'

import './globals.css'
import PageFrame from './pageFrame'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Student Meals',
  description: 'Community for students to share their cooking recipes',
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageFrame>
          {children}
        </PageFrame>
      </body>
    </html>
  )
}
