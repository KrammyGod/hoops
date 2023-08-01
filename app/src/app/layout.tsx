import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import SessionProvider from '@/hooks/SessionProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Hoops',
    description: 'A analytical stats platform for the NBA',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <SessionProvider>
                    <Navbar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
