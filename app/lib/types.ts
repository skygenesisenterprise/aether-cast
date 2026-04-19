// Types de base pour le contenu média
export interface MediaItem {
  id: string
  title: string
  description: string
  imageUrl: string
  backdropUrl?: string
  rating: string
  year: number
  duration?: string
  genres: string[]
  type: 'movie' | 'series'
  seasons?: number
  episodes?: number
  addedAt: Date
  views: number
  progress?: number
  lastWatched?: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  items: MediaItem[]
}

// Types pour le dashboard
export interface DashboardStats {
  totalMedia: number
  totalMovies: number
  totalSeries: number
  totalViews: number
  recentlyAdded: number
  storageUsed: string
}

export interface LibraryFolder {
  id: string
  name: string
  path: string
  type: 'movies' | 'series' | 'mixed'
  itemCount: number
  lastScanned: Date
  isScanning: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
}

export interface ActivityLog {
  id: string
  action: string
  details: string
  userId: string
  userName: string
  timestamp: Date
}
