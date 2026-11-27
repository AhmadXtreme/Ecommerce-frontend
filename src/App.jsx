import React from 'react'
import {HomePage} from './Pages/home/HomePage'
import { Routes, Route } from 'react-router-dom'
import {CheckoutPage} from './Pages/checkout/CheckoutPage'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage'
import axios from 'axios'
import { useEffect, useState } from 'react'
 
const App = () => {
    useEffect(()=>{
 
     LoadCart();
   },[]);
   const[cart, setCart]=useState([]);
        const LoadCart=async ()=>{
        const response=await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
      
        }

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} LoadCart={LoadCart}/>}/> 
      <Route  path="checkout" element={<CheckoutPage cart={cart} LoadCart={LoadCart}/>}/>
      <Route  path="orders" element={<OrdersPage cart={cart} LoadCart={LoadCart}/>} />
      <Route  path="tracking" element={<TrackingPage cart={cart}/>}/>
    </Routes>
    
    
  )
}

export default App
