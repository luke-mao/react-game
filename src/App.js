import React from 'react'
import { Route, Routes } from 'react-router'
import FooterBar from './components/FooterBar'
import MainBody from './components/MainBody'
import Sidebar from './components/Sidebar'
import DashBoard from './pages/DashBoard'
import Snek from './pages/Snek'
import Tictac from './pages/Tictac'
import Tower from './pages/Tower'

export default function App() {
  return (
    <div>
      <Sidebar/>
      <MainBody>
        <Routes>
          <Route path='/home' element={<DashBoard/>}/>
          <Route path='./tictactoe' element={<Tictac/>}/>
          <Route path='./tower' element={<Tower/>}/>
          <Route path='./snek' element={<Snek/>}/>
          
          {/* default and 404 page */}
          <Route path='/' element={<DashBoard/>}/>
          <Route path='*' element={<DashBoard/>}/>
        </Routes>
      </MainBody>
      <FooterBar/>
    </div>
  )
}
