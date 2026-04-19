'use client'

import { Suspense, use } from 'react'
import { HeroBanner } from '@/components/browse/hero-banner'
import { BrowseSections } from '@/components/browse/browse-sections'
import { mockMediaItems, getFeaturedContent } from '@/lib/data'
import { MediaItem } from '@/lib/types'
import { SECTION_ORDER, SectionId } from '@/lib/sections'

function getSectionData(): Record<SectionId, MediaItem[]> {
  const all = mockMediaItems
  
  const byViews = [...all].sort((a, b) => b.views - a.views)
  const byDate = [...all].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime())
  const movies = all.filter(m => m.type === 'movie')
  const series = all.filter(s => s.type === 'series')
  
  const withProgress = all
    .filter(item => item.progress !== undefined && item.progress !== null)
    .slice(0, 6)

  const recommended = [...all]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)

  return {
    'continue-watching': withProgress.length > 0 ? withProgress : all.slice(0, 4),
    'recommended': recommended,
    'aether-picks': byViews.slice(0, 6),
    'trending': byViews.slice(0, 6),
    'recently-added': byDate.slice(0, 6),
    'library': all.slice(0, 6),
    'discover': [...all].sort(() => Math.random() - 0.5).slice(0, 6),
    'community': all.slice(0, 4),
  }
}

function BrowseContent({ tab }: { tab: string | null }) {
  const featured = getFeaturedContent()
  const sectionData = getSectionData()

  if (tab && tab !== 'home') {
    const sectionId = tab as SectionId
    if (SECTION_ORDER.includes(sectionId)) {
      const items = sectionData[sectionId] || []
      
      return (
        <div className="min-h-screen bg-black text-white">
          <div className="pt-24 pb-8 px-4 md:px-8 lg:px-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {sectionId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h1>
          </div>
          <BrowseSections 
            sections={[{ id: sectionId, items }]} 
            defaultItems={sectionData}
          />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroBanner item={featured} />
      <div className="-mt-28 relative z-10 pb-12">
        <BrowseSections sections={[]} defaultItems={sectionData} />
      </div>
    </div>
  )
}

export default function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const params = use(searchParams)
  const tab = params.tab || 'home'

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BrowseContent tab={tab} />
    </Suspense>
  )
}