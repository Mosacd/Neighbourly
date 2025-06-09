import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout'
import Home from './pages/homePage'
import SingleEvent from './pages/singleEvent'
import Events from './pages/Events'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="Home" element={<Home />} />
        <Route path="Events" element={<Events />} />
        <Route path="Events/:id" element={<SingleEvent />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}

export default App
