import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/homePage'
import SingleEvent from './pages/singleEvent'
import Events from './pages/Events'
import AuthLayout from './layouts/AuthLayout'
import SignInForm from './pages/SignIn'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="Dashboard/Home" replace />} />
      <Route path="Dashboard" element={<DashboardLayout />}>
        {/* <Route index element={<Navigate to="/home" />} /> */}
        <Route path="Home" element={<Home />} />
        <Route path="Events" element={<Events />} />
        <Route path="Events/:id" element={<SingleEvent />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
      <Route path="Auth" element={<AuthLayout />}>
        <Route path="SignIn" element={<SignInForm />} />
        <Route path="SignUp" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
