// App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import MovieDetail from './components/MovieDetail.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/detail/:id' element={<MovieDetail/>} />
    </Routes>
  )
}

export default App
