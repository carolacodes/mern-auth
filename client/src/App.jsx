import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPages from './pages/RegisterPages'
import LoginPages from './pages/LoginPages'
import { AuthProvider } from './context/AuthProvider'

function App() {
  return (
    <>
          <BrowserRouter>
            <AuthProvider>
                <Routes>
                  <Route path="/" element={<h1>Home</h1>} />
                  <Route path="/login" element={<LoginPages />} />
                  <Route path="/register" element={<RegisterPages />} />
                  <Route path='/profile' element={<h1>Profile</h1>} />
                </Routes>
              </AuthProvider>
          </BrowserRouter>
    </>
  )
}

export default App
