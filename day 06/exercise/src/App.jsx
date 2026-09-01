import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import DishDetail from './pages/DishDetail'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='menu' element={<Menu />} />
          <Route path='menu/:id' element={<DishDetail />} />
          <Route
            path='checkout'
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
