'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我们' },
  { href: '/services', label: '服务介绍' },
  { href: '/stories', label: '用户故事' },
  { href: '/contact', label: '联系我们' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/98 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer" aria-label="唐小侠首页">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" aria-hidden="true" />
            <span className="text-xl sm:text-2xl font-bold text-primary font-heading">唐小侠</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="主导航">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-medium rounded-lg transition-all duration-150 ${
                  pathname === link.href
                    ? 'text-primary bg-primary/10 font-semibold'
                    : 'text-text-secondary hover:text-primary hover:bg-gray-50'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light transition-all duration-150 min-h-[44px] cursor-pointer"
          >
            立即申请
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-100"
            role="navigation"
            aria-label="移动端导航"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 font-medium rounded-lg transition-all duration-150 min-h-[44px] flex items-center ${
                    pathname === link.href
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-text-secondary hover:text-primary hover:bg-gray-50'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 mx-0 px-4 py-3 bg-accent text-white rounded-lg font-medium text-center min-h-[44px] flex items-center justify-center cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                立即申请
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
