'use client'

import { MediaRow } from './media-row'
import { MediaItem } from '@/lib/types'
import { SECTION_ORDER, SECTION_LOCALES, SectionId } from '@/lib/sections'

interface BrowseSectionItem {
  id: SectionId
  items: MediaItem[]
}

interface BrowseSectionsProps {
  sections: BrowseSectionItem[]
  defaultItems?: Record<SectionId, MediaItem[]>
}

export function BrowseSections({ sections, defaultItems = {} }: BrowseSectionsProps) {
  const getSectionItems = (id: SectionId): MediaItem[] => {
    const found = sections.find(s => s.id === id)
    if (found) return found.items
    
    const foundDefault = defaultItems[id]
    if (foundDefault) return foundDefault
    
    return []
  }

  const hasItems = (id: SectionId): boolean => {
    return getSectionItems(id).length > 0
  }

  const renderSection = (id: SectionId, index: number) => {
    const title = SECTION_LOCALES[id]
    const items = getSectionItems(id)
    
    if (items.length === 0) {
      return null
    }

    const showProgress = id === 'continue-watching'
    const isLarge = id === 'recently-added' || id === 'aether-picks'
    const size = isLarge ? 'large' : 'normal'

    return (
      <MediaRow
        key={id}
        title={title}
        items={items}
        size={size}
        showProgress={showProgress}
        seeAllHref={`/browse/${id}`}
      />
    )
  }

  return (
    <div className="space-y-1">
      {SECTION_ORDER.filter(id => hasItems(id)).map((id, index) => 
        renderSection(id, index)
      )}
    </div>
  )
}