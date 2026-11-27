  // import './header.css'
  import './HomePage.css'
  import {Header} from '../../components/Header.jsx'
  import axios from 'axios'
  import { useEffect, useState } from 'react'

  import { ProductGrid } from './ProductGrid'
  
  export function HomePage({cart, LoadCart}){
    const[products,setProducts]=useState([]);
   
    useEffect(()=>{
        const fetchProduct=async ()=>{
        const response= await axios.get('/api/products');
            setProducts(response.data); 
        }
      fetchProduct();


    },[]);
           
      

   return <>
         <title>Ecommerce Project</title>

    <Header cart={cart}/>
    <div className="home-page">
      <ProductGrid products={products} LoadCart={LoadCart}/>
    </div>
    </>
  }
  