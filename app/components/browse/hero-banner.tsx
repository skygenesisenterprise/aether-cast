'use client'

import { Play, Info, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MediaItem } from '@/lib/types'

interface HeroBannerProps {
  item: MediaItem
}

export function HeroBanner({ item }: HeroBannerProps) {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[900px]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={item.backdropUrl || item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-32 px-4 lg:px-12">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight">
            {item.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2 py-0.5 border border-white/50 rounded text-white font-medium">
              {item.rating}
            </span>
            <span className="text-[#a3a3a3]">{item.year}</span>
            {item.type === 'series' && item.seasons && (
              <span className="text-[#a3a3a3]">{item.seasons} saison{item.seasons > 1 ? 's' : ''}</span>
            )}
            {item.type === 'movie' && item.duration && (
              <span className="text-[#a3a3a3]">{item.duration}</span>
            )}
            <div className="flex gap-1">
              {item.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="text-[#a3a3a3]">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#a3a3a3] text-base lg:text-lg leading-relaxed line-clamp-3 max-w-xl">
            {item.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href={`/browse/watch/${item.id}`}
              className="flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded font-semibold transition-colors"
            >
              <Play size={20} fill="currentColor" />
              Lecture
            </Link>
            <Link
              href={`/browse/details/${item.id}`}
              className="flex items-center gap-2 bg-[#333333]/80 hover:bg-[#333333] text-white px-6 py-2.5 rounded font-semibold transition-colors"
            >
              <Info size={20} />
              Plus d&apos;infos
            </Link>
          </div>
        </div>
      </div>

      {/* Mute button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-32 right-4 lg:right-12 p-2 border border-white/50 rounded-full text-white/70 hover:text-white transition-colors"
        aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  )
}
