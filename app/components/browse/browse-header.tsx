'use client'

import { Search, Bell, User, Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/browse', label: 'Accueil', tab: null },
  { href: '/browse?tab=series', label: 'Séries', tab: 'series' },
  { href: '/browse?tab=films', label: 'Films', tab: 'films' },
  { href: '/browse?tab=nouveautes', label: 'Nouveautés', tab: 'nouveautes' },
  { href: '/browse?tab=ma-liste', label: 'Ma Liste', tab: 'ma-liste' },
]

export function BrowseHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (tab: string | null) => {
    if (tab === null) return !currentTab && pathname === '/browse'
    return currentTab === tab
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-[#0a0a0a]/80 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-12 h-16">
        {/* Logo */}
        <Link href="/browse" className="flex items-center gap-1 shrink-0">
          <span className="text-2xl lg:text-3xl font-bold text-[#e50914]">Aether</span>
          <span className="text-xs lg:text-sm text-[#a3a3a3] font-medium tracking-widest">CAST</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 ml-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                isActiveLink(link.tab)
                  ? 'text-white'
                  : 'text-[#a3a3a3]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search */}
          <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'bg-[#0a0a0a]/90 border border-[#2a2a2a] rounded-md' : ''}`}>
            {isSearchOpen && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titres, genres..."
                className="w-40 lg:w-60 bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-[#a3a3a3] focus:outline-none"
                autoFocus
              />
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#a3a3a3] hover:text-white transition-colors"
              aria-label="Rechercher"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          {/* Notifications */}
          <button className="hidden lg:flex p-2 text-[#a3a3a3] hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e50914] rounded-full" />
          </button>

          {/* User menu */}
          <button className="flex items-center gap-2 p-1 rounded hover:bg-[#333333]/50 transition-colors">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#e50914] to-orange-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <ChevronDown size={16} className="hidden lg:block text-[#a3a3a3]" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#a3a3a3] hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#2a2a2a]">
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-3 text-base font-medium transition-colors ${
                  isActiveLink(link.tab)
                    ? 'text-white bg-[#333333]/50'
                    : 'text-[#a3a3a3] hover:text-white hover:bg-[#333333]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[#2a2a2a] mt-2 pt-2">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 text-base font-medium text-[#a3a3a3] hover:text-white hover:bg-[#333333]/30 flex items-center gap-2"
              >
                Gestion
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
