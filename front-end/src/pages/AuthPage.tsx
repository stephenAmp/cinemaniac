"use client"

import type React from "react"
import  useAuth  from '@/auth/useAuth'
import {  useState } from "react"
import { toast } from 'react-toastify'
import { loginAPI, registerAPI } from "@/api/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Film, Mail, Lock, User, Facebook, Apple } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ username, setUsername ] = useState<string>("")
  const [email, setEmail] = useState<string>('')
  // const [loginErrorMsg, setLoginErrorMsg] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [ password, setPassword ] = useState<string>("")
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if(!name || !email || !password){
      toast.error('Please enter credentials')
      return
    }
    try{
      const response = await registerAPI({email, password, name})
      const access_token = response?.access_token
      if(access_token){
        login(access_token)
        toast.success('account successfully created')
        navigate('/dashboard')
      }else{
        console.error('no token provided')
      }
    }catch(error){
      console.error(`error occured while signing up: ${error}`)
    }finally{
      setIsLoading(false)
    }
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if(!username || !password){
      toast.error('Provide username and login')
      return
    }

      try{
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        const response = await loginAPI(formData)
        const access_token = response?.access_token
        if(access_token){
          login(access_token)
          navigate('/dashboard')
        }else{
          console.error('Error! No token found')
        }
      }catch(error){
        console.error(`An error occured while logging in: ${error}`)
      }finally{
        setIsLoading(false)
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">Cinemaniac</h1>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-slate-800 bg-slate-950/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login" className="text-white">
                      Username
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email-login"
                        type="email"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10 bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-login" className="text-white">
                        Password
                      </Label>
                      <Link to="/forgot-password" className="text-xs text-red-400 hover:text-red-300">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password-login"
                        type="password"
                        value={password}
                        onChange = {(e)=>setPassword(e.target.value)}
                        className="pl-10 bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  {/* <p>{loginErrorMsg}</p> */}
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-950 px-2 text-slate-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-slate-900 border-slate-800 hover:bg-slate-800">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="bg-slate-900 border-slate-800 hover:bg-slate-800">
                    <Facebook className="mr-2 h-4 w-4 text-blue-500" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-slate-800 bg-slate-950/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">Create an account</CardTitle>
                <CardDescription>Enter your details to get started with Cinemaniac</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange = {(e)=>setName(e.target.value)}
                        className="pl-10 bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-signup" className="text-white">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email-signup"
                        type="email"
                        value = {email}
                        onChange = {(e)=>setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10 bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-signup" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password-signup"
                        type="password"
                        value={password}
                        onChange = {(e)=>setPassword(e.target.value)}
                        className="pl-10 bg-slate-900 border-slate-800"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-400">Password must be at least 8 characters long</p>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-950 px-2 text-slate-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="bg-slate-900 border-slate-800 hover:bg-slate-800">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </Button>
                  <Button variant="outline" className="bg-slate-900 border-slate-800 hover:bg-slate-800">
                    <Facebook className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="outline" className="bg-slate-900 border-slate-800 hover:bg-slate-800">
                    <Apple className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-400 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-red-400 hover:text-red-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-red-400 hover:text-red-300">
                  Privacy Policy
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

