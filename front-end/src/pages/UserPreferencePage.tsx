
import { useState } from "react"
import { Link } from "react-router-dom"
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
  X,
  Plus,
  Save,
  ChevronLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
// Mock data
const genreOptions = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "War",
  "Western",
]

const actorOptions = [
  { id: 1, name: "Tom Hanks", image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Meryl Streep", image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Leonardo DiCaprio", image: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Viola Davis", image: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "Denzel Washington", image: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "Jennifer Lawrence", image: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "Brad Pitt", image: "/placeholder.svg?height=50&width=50" },
  { id: 8, name: "Cate Blanchett", image: "/placeholder.svg?height=50&width=50" },
  { id: 9, name: "Robert Downey Jr.", image: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "Scarlett Johansson", image: "/placeholder.svg?height=50&width=50" },
]

const directorOptions = [
  { id: 1, name: "Steven Spielberg", image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Christopher Nolan", image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Martin Scorsese", image: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Quentin Tarantino", image: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "Greta Gerwig", image: "/placeholder.svg?height=50&width=50" },
  { id: 6, name: "Denis Villeneuve", image: "/placeholder.svg?height=50&width=50" },
  { id: 7, name: "Bong Joon-ho", image: "/placeholder.svg?height=50&width=50" },
  { id: 8, name: "Kathryn Bigelow", image: "/placeholder.svg?height=50&width=50" },
  { id: 9, name: "Spike Lee", image: "/placeholder.svg?height=50&width=50" },
  { id: 10, name: "Ava DuVernay", image: "/placeholder.svg?height=50&width=50" },
]

export default function UserPreferences() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["Action", "Sci-Fi", "Thriller"])
  const [selectedActors, setSelectedActors] = useState<typeof actorOptions>([actorOptions[2], actorOptions[6]])
  const [selectedDirectors, setSelectedDirectors] = useState<typeof directorOptions>([directorOptions[1]])
  const [genreOpen, setGenreOpen] = useState(false)
  const [actorOpen, setActorOpen] = useState(false)
  const [directorOpen, setDirectorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSavePreferences = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast(
        "Your movie preferences have been updated successfully."
      )
    }, 1500)
  }

  const removeGenre = (genre: string) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre))
  }

  const removeActor = (actorId: number) => {
    setSelectedActors(selectedActors.filter((a) => a.id !== actorId))
  }

  const removeDirector = (directorId: number) => {
    setSelectedDirectors(selectedDirectors.filter((d) => d.id !== directorId))
  }

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
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
              <Home className="mr-3 h-5 w-5" />
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
            <Link to="#" className="flex items-center px-3 py-2 text-slate-200 rounded-md bg-slate-800">
              <Settings className="mr-3 h-5 w-5 text-red-500" />
              <span>Preferences</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 md:pl-64">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Movie Preferences</h1>
          </div>

          <p className="text-slate-400 mb-8">
            Customize your movie recommendations by selecting your favorite genres, actors, and directors. We'll use
            this information to suggest movies you'll love.
          </p>

          <Tabs defaultValue="genres" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="genres">Genres</TabsTrigger>
              <TabsTrigger value="actors">Actors</TabsTrigger>
              <TabsTrigger value="directors">Directors</TabsTrigger>
            </TabsList>

            <TabsContent value="genres">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Favorite Genres</CardTitle>
                  <CardDescription>Select the movie genres you enjoy watching the most</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Popover open={genreOpen} onOpenChange={setGenreOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Genre
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-slate-800 border-slate-700" align="start">
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search genres..." className="border-none focus:ring-0" />
                          <CommandList>
                            <CommandEmpty>No genres found.</CommandEmpty>
                            <CommandGroup>
                              {genreOptions
                                .filter((genre) => !selectedGenres.includes(genre))
                                .map((genre) => (
                                  <CommandItem
                                    key={genre}
                                    onSelect={() => {
                                      setSelectedGenres([...selectedGenres, genre])
                                      setGenreOpen(false)
                                    }}
                                    className="hover:bg-slate-700"
                                  >
                                    {genre}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedGenres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1"
                      >
                        {genre}
                        <button className="ml-2 text-slate-400 hover:text-slate-200" onClick={() => removeGenre(genre)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actors">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Favorite Actors</CardTitle>
                  <CardDescription>Select actors whose work you enjoy watching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Popover open={actorOpen} onOpenChange={setActorOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Actor
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-slate-800 border-slate-700" align="start">
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search actors..." className="border-none focus:ring-0" />
                          <CommandList>
                            <CommandEmpty>No actors found.</CommandEmpty>
                            <CommandGroup>
                              {actorOptions
                                .filter((actor) => !selectedActors.some((a) => a.id === actor.id))
                                .map((actor) => (
                                  <CommandItem
                                    key={actor.id}
                                    onSelect={() => {
                                      setSelectedActors([...selectedActors, actor])
                                      setActorOpen(false)
                                    }}
                                    className="hover:bg-slate-700"
                                  >
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={actor.image} alt={actor.name} />
                                        <AvatarFallback className="text-xs">{actor.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      {actor.name}
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedActors.map((actor) => (
                      <div key={actor.id} className="flex items-center gap-2 bg-slate-800 p-2 rounded-md">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={actor.image} alt={actor.name} />
                          <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{actor.name}</p>
                        </div>
                        <button className="text-slate-400 hover:text-slate-200" onClick={() => removeActor(actor.id)}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="directors">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Favorite Directors</CardTitle>
                  <CardDescription>Select directors whose films you enjoy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Popover open={directorOpen} onOpenChange={setDirectorOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Director
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-slate-800 border-slate-700" align="start">
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search directors..." className="border-none focus:ring-0" />
                          <CommandList>
                            <CommandEmpty>No directors found.</CommandEmpty>
                            <CommandGroup>
                              {directorOptions
                                .filter((director) => !selectedDirectors.some((d) => d.id === director.id))
                                .map((director) => (
                                  <CommandItem
                                    key={director.id}
                                    onSelect={() => {
                                      setSelectedDirectors([...selectedDirectors, director])
                                      setDirectorOpen(false)
                                    }}
                                    className="hover:bg-slate-700"
                                  >
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={director.image} alt={director.name} />
                                        <AvatarFallback className="text-xs">{director.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      {director.name}
                                    </div>
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDirectors.map((director) => (
                      <div key={director.id} className="flex items-center gap-2 bg-slate-800 p-2 rounded-md">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={director.image} alt={director.name} />
                          <AvatarFallback>{director.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{director.name}</p>
                        </div>
                        <button
                          className="text-slate-400 hover:text-slate-200"
                          onClick={() => removeDirector(director.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              onClick={handleSavePreferences}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  )
}

