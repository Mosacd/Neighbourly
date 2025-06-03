import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import Home from './pages/home-page'

function App() {
 

  return (
    <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route path='/' element={<Layout/>}>
        <Route path='/home' element={<Home/>} />
      </Route>
    </Routes>
    
  )
}

export default App
