import '@/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from '../src/pages/AuthPage'
import Dashboard  from './pages/DashboardPage'
import UserPreferences from './pages/UserPreferencePage'


export default function App(){

  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user-preferences' element={<UserPreferences/>}/>
      </Routes>
    </Router>
    </>
  )
}