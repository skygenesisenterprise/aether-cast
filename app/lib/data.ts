import { MediaItem, Category, DashboardStats, LibraryFolder, ActivityLog } from './types'

// Données mock pour le contenu
export const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'The Last of Us',
    description: 'Un monde ravagé par une pandémie. Joel et Ellie traversent ce qui reste des États-Unis dans une quête pour retrouver l\'humanité.',
    imageUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&q=80',
    rating: '16+',
    year: 2023,
    duration: '50 min',
    genres: ['Drame', 'Action', 'Horreur'],
    type: 'series',
    seasons: 2,
    episodes: 17,
    addedAt: new Date('2024-01-15'),
    views: 15420,
  },
  {
    id: '2',
    title: 'The Mandalorian',
    description: 'Les aventures d\'un chasseur de primes solitaire dans les confins de la galaxie, loin de l\'autorité de la Nouvelle République.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    rating: '12+',
    year: 2019,
    duration: '40 min',
    genres: ['Science-Fiction', 'Action', 'Aventure'],
    type: 'series',
    seasons: 3,
    episodes: 24,
    addedAt: new Date('2024-02-10'),
    views: 28340,
  },
  {
    id: '3',
    title: 'Inception',
    description: 'Un voleur qui s\'infiltre dans les rêves des autres pour voler leurs secrets se voit offrir une chance de rédemption.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
    rating: '12+',
    year: 2010,
    duration: '2h 28min',
    genres: ['Science-Fiction', 'Action', 'Thriller'],
    type: 'movie',
    addedAt: new Date('2024-01-20'),
    views: 12890,
  },
  {
    id: '4',
    title: 'Stranger Things',
    description: 'Quand un jeune garçon disparaît, une petite ville découvre une mystérieuse expérience gouvernementale et un monde parallèle terrifiant.',
    imageUrl: 'https://images.unsplash.com/photo-1533613220915-121e0f2610d9?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1533613220915-121e0f2610d9?w=1920&q=80',
    rating: '14+',
    year: 2016,
    duration: '50 min',
    genres: ['Drame', 'Fantastique', 'Horreur'],
    type: 'series',
    seasons: 4,
    episodes: 34,
    addedAt: new Date('2024-03-01'),
    views: 45230,
  },
  {
    id: '5',
    title: 'Interstellar',
    description: 'Une équipe d\'explorateurs voyage à travers un trou de ver dans l\'espace pour assurer la survie de l\'humanité.',
    imageUrl: 'https://images.unsplash.com/photo-1540224477051-ef6cfc46b6ee?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1540224477051-ef6cfc46b6ee?w=1920&q=80',
    rating: '12+',
    year: 2014,
    duration: '2h 49min',
    genres: ['Science-Fiction', 'Drame', 'Aventure'],
    type: 'movie',
    addedAt: new Date('2024-02-28'),
    views: 18750,
  },
  {
    id: '6',
    title: 'Breaking Bad',
    description: 'Un professeur de chimie diagnostiqué d\'un cancer du poumon se lance dans la fabrication de méthamphétamine.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9e3fb523?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9e3fb523?w=1920&q=80',
    rating: '16+',
    year: 2008,
    duration: '45 min',
    genres: ['Drame', 'Crime', 'Thriller'],
    type: 'series',
    seasons: 5,
    episodes: 62,
    addedAt: new Date('2024-01-05'),
    views: 67890,
  },
  {
    id: '7',
    title: 'Dune',
    description: 'Paul Atréides, un jeune homme brillant et talentueux né dans une grande destinée, doit se rendre sur la planète la plus dangereuse de l\'univers.',
    imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1920&q=80',
    rating: '12+',
    year: 2021,
    duration: '2h 35min',
    genres: ['Science-Fiction', 'Aventure', 'Drame'],
    type: 'movie',
    addedAt: new Date('2024-03-10'),
    views: 23450,
  },
  {
    id: '8',
    title: 'The Crown',
    description: 'L\'histoire de la reine Elizabeth II et des événements politiques et personnels qui ont façonné son règne.',
    imageUrl: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=500&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=1920&q=80',
    rating: '12+',
    year: 2016,
    duration: '58 min',
    genres: ['Drame', 'Biographie', 'Histoire'],
    type: 'series',
    seasons: 6,
    episodes: 60,
    addedAt: new Date('2024-02-15'),
    views: 34120,
  },
]

// Catégories pour le browse
export const mockCategories: Category[] = [
  {
    id: 'trending',
    name: 'En tendance',
    slug: 'trending',
    items: mockMediaItems.sort((a, b) => b.views - a.views).slice(0, 6),
  },
  {
    id: 'series',
    name: 'Séries populaires',
    slug: 'series',
    items: mockMediaItems.filter(item => item.type === 'series'),
  },
  {
    id: 'movies',
    name: 'Films à découvrir',
    slug: 'movies',
    items: mockMediaItems.filter(item => item.type === 'movie'),
  },
  {
    id: 'recent',
    name: 'Récemment ajoutés',
    slug: 'recent',
    items: [...mockMediaItems].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime()).slice(0, 6),
  },
]

// Stats du dashboard
export const mockDashboardStats: DashboardStats = {
  totalMedia: mockMediaItems.length,
  totalMovies: mockMediaItems.filter(item => item.type === 'movie').length,
  totalSeries: mockMediaItems.filter(item => item.type === 'series').length,
  totalViews: mockMediaItems.reduce((acc, item) => acc + item.views, 0),
  recentlyAdded: mockMediaItems.filter(item => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return item.addedAt > thirtyDaysAgo
  }).length,
  storageUsed: '1.2 TB',
}

// Dossiers de bibliothèque
export const mockLibraryFolders: LibraryFolder[] = [
  {
    id: '1',
    name: 'Films HD',
    path: '/media/movies',
    type: 'movies',
    itemCount: 156,
    lastScanned: new Date('2024-03-15T10:30:00'),
    isScanning: false,
  },
  {
    id: '2',
    name: 'Séries TV',
    path: '/media/series',
    type: 'series',
    itemCount: 48,
    lastScanned: new Date('2024-03-15T09:15:00'),
    isScanning: false,
  },
  {
    id: '3',
    name: 'Documentaires',
    path: '/media/docs',
    type: 'mixed',
    itemCount: 32,
    lastScanned: new Date('2024-03-14T18:45:00'),
    isScanning: true,
  },
]

// Logs d'activité
export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'media_added',
    details: 'Ajout de "Dune: Part Two" à la bibliothèque',
    userId: 'admin',
    userName: 'Admin',
    timestamp: new Date('2024-03-15T14:30:00'),
  },
  {
    id: '2',
    action: 'library_scan',
    details: 'Scan de la bibliothèque "Films HD" terminé - 3 nouveaux fichiers',
    userId: 'system',
    userName: 'Système',
    timestamp: new Date('2024-03-15T10:30:00'),
  },
  {
    id: '3',
    action: 'user_login',
    details: 'Connexion de l\'utilisateur Marie',
    userId: 'user2',
    userName: 'Marie',
    timestamp: new Date('2024-03-15T08:15:00'),
  },
  {
    id: '4',
    action: 'settings_updated',
    details: 'Paramètres de transcodage modifiés',
    userId: 'admin',
    userName: 'Admin',
    timestamp: new Date('2024-03-14T16:45:00'),
  },
]

// Fonction helper pour obtenir le contenu en vedette
export function getFeaturedContent(): MediaItem {
  return mockMediaItems.sort((a, b) => b.views - a.views)[0]
}

// Fonction helper pour filtrer par type
export function getMediaByType(type: 'movie' | 'series'): MediaItem[] {
  return mockMediaItems.filter(item => item.type === type)
}

// Fonction helper pour rechercher
export function searchMedia(query: string): MediaItem[] {
  const lowercaseQuery = query.toLowerCase()
  return mockMediaItems.filter(
    item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
  )
}
