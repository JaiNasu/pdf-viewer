// /src/app/page.js
import Link from 'next/link';
import { 
    BookOpenIcon, 
    HomeIcon, 
    CommandLineIcon, 
    AcademicCapIcon,
} from '@heroicons/react/24/outline';
// Sidebar navigation links
const navigation = [
  { name: 'Home', href: 'https://home-d0ot0s2er-jainasus-projects.vercel.app/', icon: HomeIcon },
  { name: 'Github', href: 'https://github.com/JaiNasu?tab=repositories', icon:  CommandLineIcon},
  { name: 'Moodle', href:'https://wsdmoodle.waseda.jp/my/courses.php', icon: AcademicCapIcon },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- Sidebar --- */}
      <aside className="w-64 flex-shrink-0 bg-white p-6 border-r border-gray-200">
        <nav className="flex flex-col space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Navigation</h2>
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
      <div className="flex-grow p-10 flex items-center justify-center">
        <main className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            HOME
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A Product of Pure Vibe Coding.
          </p>

          <div className="mt-10 flex items-center justify-center">
              <Link
                href="/viewer"
                className="block w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left shadow-md transition-all hover:border-blue-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                Preliminaries for Particle Physics &rarr;
                </h2>
                <p className="mt-2 text-gray-500">
                  Click to Open PDF
                </p>
              </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
