import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import DishDetail from './pages/DishDetail'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import RequireAuth from './components/RequireAuth'
import Skeleton from './components/Skeleton'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

const Checkout = lazy(() => import('./pages/Checkout'))
const Receipt = lazy(() => import('./pages/Receipt'))

function AppContent() {
  const { theme } = useTheme()

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path='menu'
            element={
              <ErrorBoundary
                fallback={(error, reset) => (
                  <div className='error'>
                    <h3>Menu Error</h3>
                    <p>{error?.message}</p>
                    <button type='button' onClick={reset} className='retry_btn'>
                      Try Again
                    </button>
                  </div>
                )}
              >
                <Menu />
              </ErrorBoundary>
            }
          />
          <Route path='menu/:id' element={<DishDetail />} />
          <Route
            path='checkout'
            element={
              <RequireAuth>
                <Suspense fallback={<Skeleton type='form' />}>
                  <Checkout />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path='receipt'
            element={
              <Suspense fallback={<Skeleton type='receipt' />}>
                <Receipt />
              </Suspense>
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
