import {Header} from '../../components/Header'
import './OrdersPage.css'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { OrderGrid } from './OrderGrid'

export function OrdersPage({cart,LoadCart}){
  const[orders,setOrders]=useState([]);
  useEffect(()=>{
    const fetchOrders=async  ()=>{
        const response= await axios.get('/api/orders?expand=products');
       setOrders(response.data);
    }
    fetchOrders();
  },[]);
    return(
        <> <title>Orders</title>
      <Header cart={cart} />

    <div className="orders-page">
      <div className="page-title">Your Orders</div>

    
      <OrderGrid orders={orders} LoadCart={LoadCart}/>
    </div>
        </>
    )
}