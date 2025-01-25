import Link from 'next/link';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Paperdoll Stats</title>
        <meta name="description" content="Character stats tracking for Paperdoll" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-900 text-white">
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/stats">Stats</Link></li>
            <li><Link href="/invite">Invite</Link></li>
          </ul>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
