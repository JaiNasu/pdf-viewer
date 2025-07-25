// /src/app/page.js

'use client'

import Link from 'next/link';
import { useState } from 'react';
import { 
    BookOpenIcon, 
    HomeIcon, 
    CommandLineIcon, 
    AcademicCapIcon,
    RssIcon,
    Bars3Icon, // Hamburger menu icon
    XMarkIcon, // Close icon
    EnvelopeIcon,
    CodeBracketIcon,
    ChatBubbleLeftIcon,
    BoltIcon,
    AtSymbolIcon
} from '@heroicons/react/24/outline';

// Sidebar navigation links
const navigation = [
  { name: 'Source', href: 'https://github.com/JaiNasu/Homepage', icon: CodeBracketIcon },
  { name: 'Home', href: 'https://home-pi-lac.vercel.app/', icon: HomeIcon },
  { name: 'Moodle', href:'https://wsdmoodle.waseda.jp/my/courses.php', icon: AcademicCapIcon },
  { name: 'Syllabus', href: 'https://www.wsl.waseda.jp/syllabus/JAA101.php', icon: BookOpenIcon },
  { name: 'Gmail', href: 'https://mail.google.com/mail/u/0/#inbox', icon: EnvelopeIcon },
  { name: 'Gemini AI', href: 'https://gemini.google.com/u/2/app?hl=ja', icon: BoltIcon},
  { name: 'Discord', href: 'https://discord.com/', icon: ChatBubbleLeftIcon },
  { name: 'Github', href: 'https://github.com/JaiNasu?tab=repositories', icon:  CommandLineIcon},
  { name: 'Lab Page', href: 'https://www.heap.phys.waseda.ac.jp/', icon: AtSymbolIcon },
];

export default function HomePage() {
  // State to manage sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 md:flex">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-[rgba(113,113,113,0.7)]" // This is the key change!
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 transform bg-white p-6 border-r border-gray-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Links</h2>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <item.icon className="h-6 w-6 mr-3 text-gray-500" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-grow bg-gray-100">
        {/* Top bar with mobile menu button */}
        <div className="sticky top-0 z-10 bg-white shadow-sm md:hidden">
          <div className="flex items-center justify-between p-4">
            <span className="text-lg font-bold text-gray-800">Hi</span>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-10">
          <main className="w-full max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Home
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Pure Vibe Coding Product
            </p>

            <div className="mt-10 flex items-center justify-center">
                <Link
                  href="/particleNote"
                  className="block w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left shadow-md transition-all hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                  Preliminaries for Particle Physics
                  </h2>
                  <p className="mt-2 text-gray-500">
                    WORK IN PROGRESS
                  </p>
                </Link>
            </div>
            <div className="mt-10 flex items-center justify-center">
                <Link
                  href="/test"
                  className="block w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left shadow-md transition-all hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Testing Things Out...
                  </h2>
                  <p className="mt-2 text-gray-500">
                    WORK IN PROGRESS
                  </p>
                </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}