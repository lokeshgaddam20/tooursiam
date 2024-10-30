import React from 'react'
import {Routes,Route,Navigate,BrowserRouter} from 'react-router-dom'
import Home from './../pages/Home';
import About  from '../pages/About';
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import SearchResultList from './../pages/SearchResultList';
import AuthProvider from '../components/auth/authcontext';
import ItineraryGenerate from '../services/ItineraryGenerate';
import Profile from '../pages/Profile';
import MyTrips from '../pages/MyTrips';
const Routers = () => {
  return (
   <AuthProvider>
   
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
        <Route path='/ItineraryGenerate' element={<ItineraryGenerate/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/mytrips" element={<MyTrips />} />
    </Routes>
    </AuthProvider>
   
  )
}

export default Routers;