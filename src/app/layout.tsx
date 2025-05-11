import { Inter } from 'next/font/google';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { NotificationDropdown } from '@/components/Notification/NotificationDropdown';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kreatli Review Tool',
  description: 'A tool for reviewing and managing creative projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <span className="text-xl font-bold text-gray-900">Kreatli Review Tool</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <NotificationDropdown />
                  </div>
                </div>
              </div>
            </nav>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
