import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Componets/Home';
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import Navber from './Componets/Navbar';
import Productdetels from './Componets/Productdetels';
import CategoryProduct from './Componets/CategoryProduct';
import ProfilePage from './Componets/ProfilePage';
import LoginPage from './Componets/LoginPage';
import RegistarPage from './Componets/RegistarPage';
import  Axios  from 'axios';
import { domain, getheader,token} from './env';
import { useGlobalState } from './State/provider';
import Cart from './Componets/Cart';
import Oldorder from './Componets/Oldorder';
import OrderPages from './Componets/OrderPages';
import OrderDetells from './Componets/OrderDetells';


const App = () => {
  const [{ profile, pagereload,cartcomplite,cartuncomplite}, dispatch] = useGlobalState()
  //  console.log(profile, "$$$$urser profile");
  // console.log(cartcomplite);
  // console.log(cartuncomplite);
  
  
  
   console.log(token)
  useEffect(()=>{
    if(token !== null ) {
      const getdata = async() =>{
        await Axios({
          method:"get",
          url:`${domain}/api/profile/`,
          headers:getheader,
        }).then(res =>{
          //  console.log(res.data['data'], "$user hear")
          dispatch({
            type:"ADD_PROFILE",
            profile:res.data["data"],
          })
        })
       
      }
      getdata()
     }
    
  
  },[pagereload])

  useEffect(()=>{
const getcart = async() =>{
  await Axios({
    method: "get",
    url:`${domain}/api/cart/`,
    headers:getheader
  }).then(res =>{
    console.log(res.data, "$$$$$ cart")
    {
      const all_data = []
      res?.data.map(data=>{
        if(data.complite){
          all_data.push(data)
          dispatch({
            type:"CART-COMPLITE",
            cartcomplite:all_data
          })
        }
        else{
          dispatch({
            type:"CART-UNCOMPLITE",
            cartuncomplite:data

          })
        }
      })
    }
  })
  
}
getcart()

  },[pagereload])

  return (

    <BrowserRouter>
    <Navber />
   
    <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/Productdetels/:id" element={<Productdetels />} />
    <Route path="/CategoryProduct/:id" element={<CategoryProduct />} />
    
    {
      profile !==null ?(
        <>
         
         <Route path="/ProfilePage" element={<ProfilePage />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/oldorder" element={<Oldorder />} />
         <Route path="/orderpages" element={<OrderPages />} />
         <Route path="/OrderDetells/:id" element={<OrderDetells />} />
      </>
      ):
      (
        <>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegistarPage" element={<RegistarPage />} />
        </>
      )
     
    }

   
   
    
      </ Routes>
    </ BrowserRouter>

  )
}

export default App
