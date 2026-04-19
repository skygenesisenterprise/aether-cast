import { MediaItem } from './types'

export type SectionId = 
  | 'continue-watching'
  | 'recommended'
  | 'aether-picks'
  | 'trending'
  | 'recently-added'
  | 'library'
  | 'discover'
  | 'community'

export interface BrowseSection {
  id: SectionId
  title: string
  titleKey: string
  dataResolver: () => Promise<MediaItem[]>
  showProgress?: boolean
  size?: 'normal' | 'large'
  showSeeAll?: boolean
  seeAllHref?: string
  priority?: number
}

export interface SectionConfig {
  sections: BrowseSection[]
  getSectionById: (id: SectionId) => BrowseSection | undefined
}

export const SECTION_ORDER: SectionId[] = [
  'continue-watching',
  'recommended',
  'aether-picks',
  'trending',
  'recently-added',
  'library',
  'discover',
  'community',
]

export const SECTION_LOCALES: Record<SectionId, string> = {
  'continue-watching': 'Reprendre la lecture',
  'recommended': 'Recommandé pour vous',
  'aether-picks': 'Aether Picks',
  'trending': 'Tendances',
  'recently-added': 'Récemment ajoutés',
  'library': 'Ma bibliothèque',
  'discover': 'Découvrir',
  'community': 'Communauté',
}