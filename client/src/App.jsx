import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPages from './pages/RegisterPages'
import LoginPages from './pages/LoginPages'
import HomePages from './pages/HomePages'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import DeleteAccountPage from './pages/DeleteAccountPage'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <>
          <BrowserRouter>
            <AuthProvider>
                <Routes>

                  <Route path="/" element={<HomePages />} />
                  <Route path="/login" element={<LoginPages />} />
                  <Route path="/register" element={<RegisterPages />} />

                  <Route element={< ProtectedRoute/>}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/profile/edit' element={<EditProfilePage />} />
                    <Route path='/profile/delete' element={<DeleteAccountPage />} />
                  </Route>
                </Routes>
              </AuthProvider>
          </BrowserRouter>
    </>
  )
}

export default App
