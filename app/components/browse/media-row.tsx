'use client'

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { MediaCard } from './media-card'
import { MediaItem } from '@/lib/types'
import Link from 'next/link'

interface MediaRowProps {
  title: string
  items: MediaItem[]
  size?: 'normal' | 'large'
  showProgress?: boolean
  seeAllHref?: string
}

export function MediaRow({ title, items, size = 'normal', showProgress, seeAllHref }: MediaRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener('resize', updateScrollButtons)
    return () => window.removeEventListener('resize', updateScrollButtons)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      const newPosition =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      })

      setTimeout(updateScrollButtons, 350)
    }
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="py-6 lg:py-8">
      {/* Title row */}
      <div className="flex items-center justify-between mb-3 px-4 lg:px-12">
        <h2 className="text-lg lg:text-xl font-semibold text-white">
          {title}
        </h2>
        {seeAllHref && (
          <Link 
            href={seeAllHref}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Tout voir
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
      
      {/* Carousel container */}
      <div className="relative group/row">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-8 z-20 w-12 lg:w-16 bg-gradient-to-r from-black to-transparent flex items-center justify-start pl-2 transition-opacity ${
            canScrollLeft ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} className="text-white drop-shadow-lg" />
        </button>

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 lg:gap-3 overflow-x-auto scrollbar-hide px-4 lg:px-12 pb-2"
          onScroll={updateScrollButtons}
        >
          {items.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              size={size} 
              showProgress={showProgress}
            />
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 bottom-8 z-20 w-12 lg:w-16 bg-gradient-to-l from-black to-transparent flex items-center justify-end pr-2 transition-opacity ${
            canScrollRight ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={32} className="text-white drop-shadow-lg" />
        </button>
      </div>
    </section>
  )
}