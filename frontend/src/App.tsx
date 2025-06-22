import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/homePage'
import SingleEvent from './pages/singleEvent'
import Events from './pages/Events'
import AuthLayout from './layouts/AuthLayout'
import SignInForm from './pages/SignIn'
import SignUpForm from './pages/SignUp'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Dashboard/Home" replace />} />
      <Route path="Dashboard" element={<DashboardLayout />}>
        {/* <Route index element={<Navigate to="/home" />} /> */}
        <Route path="Home" element={<Home />} />
        <Route path="Events" element={<Events />} />
        <Route path="Events/:id" element={<SingleEvent />} />
      </Route>
      <Route path="Auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/Auth/SignIn" replace />} />
        <Route path="SignIn" element={<SignInForm />} />
        <Route path="SignUp" element={<SignUpForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/Dashboard/home" replace />} />
    </Routes>
  )
}

export default App
