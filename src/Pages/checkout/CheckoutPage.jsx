 import './CheckoutPage.css'
 import './checkout-header.css'

 import { formatPrice } from '../../utils/money'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CheckoutHeader } from './CheckoutHeader'

import { OrderSummary } from './OrderSummary'
import { useNavigate } from 'react-router-dom'



 export function CheckoutPage({cart, LoadCart}){
    const[deliveryOption,setDeliveryOption]=useState([]);
    const[paymentSummary,setPaymentSummary]=useState(null);
    useEffect(()=>{
      const fetchCheckoutData=async ()=>{
         let response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
          setDeliveryOption(response.data);
     
   
      response=await axios.get('/api/payment-summary')
        setPaymentSummary(response.data);
      }
     fetchCheckoutData();
    
    },[cart])
    const navigate=useNavigate();
    const createOrder=async ()=>{
      await axios.post('/api/orders');
      await LoadCart();
      navigate('/orders')
      
    }
  
    return(
        <> <title>Checkout</title>
            
            <CheckoutHeader cart={cart}/>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        
       <OrderSummary cart={cart} deliveryOption={deliveryOption} LoadCart={LoadCart}/>
        {paymentSummary && <>
        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary" 
             onClick={createOrder}> 
              Place your order
            </button>
        </div></>}

      </div>
    </div>
        </>
    )
}