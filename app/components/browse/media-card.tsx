'use client'

import { Play, Plus, ThumbsUp, ChevronDown, History } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { MediaItem } from '@/lib/types'

interface MediaCardProps {
  item: MediaItem
  size?: 'normal' | 'large'
  showProgress?: boolean
}

export function MediaCard({ item, size = 'normal', showProgress }: MediaCardProps) {
  const isLarge = size === 'large'
  const width = isLarge ? 288 : 192
  const height = isLarge ? 432 : 108
  const progress = item.progress ?? Math.floor(Math.random() * 80) + 10
  const hasProgress = showProgress && progress > 0

  return (
    <div className={`${isLarge ? 'w-64 lg:w-72' : 'w-40 lg:w-48'} shrink-0 group`}>
      <div className="relative rounded-md overflow-hidden bg-[#141414]">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={width}
          height={height}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Progress bar */}
        {hasProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
            <div 
              className="h-full bg-red-600" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {/* Quick actions */}
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/browse/watch/${item.id}`}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                <Play size={14} fill="black" className="text-black ml-0.5" />
              </Link>
              <button className="w-8 h-8 rounded-full border-2 border-[#a3a3a3]/60 flex items-center justify-center hover:border-white transition-colors">
                <Plus size={16} className="text-white" />
              </button>
              <button className="w-8 h-8 rounded-full border-2 border-[#a3a3a3]/60 flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp size={14} className="text-white" />
              </button>
              <Link
                href={`/browse/details/${item.id}`}
                className="w-8 h-8 rounded-full border-2 border-[#a3a3a3]/60 flex items-center justify-center hover:border-white transition-colors ml-auto"
              >
                <ChevronDown size={16} className="text-white" />
              </Link>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="px-1 border border-[#a3a3a3]/50 text-[#a3a3a3] text-[10px]">
                  {item.rating}
                </span>
                {item.type === 'series' && item.seasons && (
                  <span className="text-[#a3a3a3]">{item.seasons} S</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[#a3a3a3]">
                {item.genres.slice(0, 2).map((genre, i) => (
                  <span key={genre}>
                    {genre}{i < 1 && item.genres.length > 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
              {hasProgress && (
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <History size={10} />
                  <span>{progress}% terminé</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Title below card */}
      <h3 className="mt-2 text-sm text-[#a3a3a3] group-hover:text-white transition-colors truncate">
        {item.title}
      </h3>
    </div>
  )
}