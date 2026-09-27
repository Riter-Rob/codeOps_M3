import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Students from './pages/Students'
import NotFound from './pages/NotFound'
import Layout from './Layout'

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Courses' element={<Courses />} />
            <Route path='Profile' element={<Profile />} />
            <Route path='Login' element={<Login />} />
            <Route path='Students' element={<Students />} />
            <Route path='*' elememt={<NotFound/>} />
            </Route>
        </Routes>
    </div>
  )
}

export default App