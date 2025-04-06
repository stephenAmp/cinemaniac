import { useState } from "react"
import { Link } from "react-router-dom"
import inception from '@/assets/inception.jpg'
import batman from '@/assets/batman.jpg'
import shawshank from '@/assets/shawshank.jpg'
import fg from '@/assets/fg.jpg'
import fc from '@/assets/fc.jpg'
import pf from '@/assets/pulpfiction.jpg'
import {
  Film,
  Search,
  Home,
  Heart,
  Clock,
  BookmarkCheck,
  TrendingUp,
  Settings,
  LogOut,
  Star,
  Play,
  Plus,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Mock data for movies
const recommendedMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    poster: inception,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    poster: shawshank,
    genre: "Drama",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    poster: batman,
    genre: "Action",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    poster: pf,
    genre: "Crime",
  },
  {
    id: 5,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    poster: fc,
    genre: "Drama",
  },
  {
    id: 6,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    poster: fg,
    genre: "Drama",
  },
]

const watchedMovies = [
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    poster: "/placeholder.svg?height=450&width=300",
    watchedDate: "Yesterday",
    progress: 100,
  },
  {
    id: 8,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    poster: "/placeholder.svg?height=450&width=300",
    watchedDate: "Last week",
    progress: 100,
  },
  {
    id: 9,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    poster: "/placeholder.svg?height=450&width=300",
    watchedDate: "2 weeks ago",
    progress: 75,
  },
  {
    id: 10,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    poster: "/placeholder.svg?height=450&width=300",
    watchedDate: "Last month",
    progress: 100,
  },
]

const likedMovies = [
  {
    id: 11,
    title: "Goodfellas",
    year: 1990,
    rating: 8.7,
    poster: "/placeholder.svg?height=450&width=300",
    genre: "Crime",
  },
  {
    id: 12,
    title: "The Lord of the Rings",
    year: 2001,
    rating: 8.8,
    poster: "/placeholder.svg?height=450&width=300",
    genre: "Fantasy",
  },
  {
    id: 13,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    poster: "/placeholder.svg?height=450&width=300",
    genre: "Thriller",
  },
  {
    id: 14,
    title: "Whiplash",
    year: 2014,
    rating: 8.5,
    poster: "/placeholder.svg?height=450&width=300",
    genre: "Drama",
  },
]

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Film className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <Film className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold text-white">Cinemaniac</h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search movies, actors, genres..."
                className="pl-9 bg-slate-800 border-slate-700 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-slate-800">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-slate-400">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-20 h-full w-64 bg-slate-900 pt-16 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-3 py-4">
          <nav className="space-y-1">
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md bg-slate-800">
              <Home className="mr-3 h-5 w-5 text-red-500" />
              <span>Home</span>
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <TrendingUp className="mr-3 h-5 w-5" />
              <span>Trending</span>
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <BookmarkCheck className="mr-3 h-5 w-5" />
              <span>Watchlist</span>
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <Heart className="mr-3 h-5 w-5" />
              <span>Favorites</span>
            </Link>
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <Clock className="mr-3 h-5 w-5" />
              <span>Watch History</span>
            </Link>
            <Link to="/user-preferences" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <Settings className="mr-3 h-5 w-5" />
              <span>Preferences</span>
            </Link>
          </nav>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</h3>
            <div className="mt-2 space-y-1">
              <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                Action
              </Link>
              <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                Comedy
              </Link>
              <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                Drama
              </Link>
              <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                Sci-Fi
              </Link>
              <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                Horror
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:pl-64">
        <div className="p-6">
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
              <Button variant="link" className="text-red-500 hover:text-red-400">
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {recommendedMovies.map((movie) => (
                <div key={movie.id} className="bg-slate-800 rounded-lg overflow-hidden group">
                  <div className="relative aspect-[2/3]">
                    <img src={movie.poster || "/placeholder.svg"} alt={movie.title}  className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex gap-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full ml-auto">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                    <h3 className="font-medium text-white line-clamp-1">{movie.title}</h3>
                    <p className="text-xs text-slate-400">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
              <Button variant="link" className="text-red-500 hover:text-red-400">
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchedMovies.map((movie) => (
                <div key={movie.id} className="bg-slate-800 rounded-lg overflow-hidden group">
                  <div className="relative aspect-[2/3]">
                    <img src={movie.poster || "/placeholder.svg"} alt={movie.title}  className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex gap-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full ml-auto">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                      <div className="h-full bg-red-500" style={{ width: `${movie.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                    <h3 className="font-medium text-white line-clamp-1">{movie.title}</h3>
                    <p className="text-xs text-slate-400">
                      {movie.year} • Watched {movie.watchedDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Your Favorites</h2>
              <Button variant="link" className="text-red-500 hover:text-red-400">
                See All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {likedMovies.map((movie) => (
                <div key={movie.id} className="bg-slate-800 rounded-lg overflow-hidden group">
                  <div className="relative aspect-[2/3]">
                    <img src={movie.poster || "/placeholder.svg"} alt={movie.title}  className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex gap-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full ml-auto">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                    <h3 className="font-medium text-white line-clamp-1">{movie.title}</h3>
                    <p className="text-xs text-slate-400">
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

