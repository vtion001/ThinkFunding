import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

interface PublicLayoutProps {
  children?: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TF</span>
              </div>
              <span className="text-navy dark:text-white font-semibold text-xl">
                Think Funding
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/how-it-works"
                className="text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-teal transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-teal transition-colors"
              >
                About
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-teal transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-teal transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* CTA Button */}
              <Link
                to="/merchant/register"
                className="hidden md:inline-flex items-center px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-navy dark:bg-navy-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Tagline */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TF</span>
                </div>
                <span className="font-semibold text-xl">Think Funding</span>
              </div>
              <p className="text-gray-300 text-sm">
                Smarter Funding for Growing Businesses
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-teal transition-colors">About Us</Link></li>
                <li><Link to="/how-it-works" className="hover:text-teal transition-colors">How It Works</Link></li>
                <li><Link to="/faq" className="hover:text-teal transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-teal transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-teal transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal transition-colors">Licenses</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>info@thinkfundinggroup.com</li>
                <li>Rhode Island, USA</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-xs text-gray-400">
              © 2026 Think Funding LLC. All rights reserved.
            </p>
            <p className="text-center text-xs text-gray-500 mt-2">
              Think Funding LLC is not a lender. We purchase future receivables.
              This is not an offer to lend. All transactions subject to approval.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
