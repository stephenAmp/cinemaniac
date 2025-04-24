import '@/index.css'
import {  Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import AuthPage from './pages/AuthPage'
import Dashboard  from './pages/DashboardPage'
import PrivateRoute from './auth/PrivateRoute'
import UserPreferences from './pages/UserPreferencePage'
import { ToastContainer } from 'react-toastify'


export default function App(){

  return(
    <>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          }/>
        <Route path='/user-preferences' element={
          <PrivateRoute>
            <UserPreferences/>
          </PrivateRoute>
          }
        />
      </Routes>

      {/* Toast container */}
      <ToastContainer position ='top-right' autoClose={3000}/>
    </>
  )
}