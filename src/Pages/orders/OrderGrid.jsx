import axios from 'axios';
import { formatPrice } from '../../utils/money'
import  dayjs from 'dayjs'
import { Fragment } from 'react';
import {Link} from 'react-router-dom'
export function OrderGrid({orders,LoadCart}){
    return(
          <div className="orders-grid">
        {orders.map((order)=>{
       
          return(
           
          <div key={order.id} 
          className="order-container">
           
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatPrice(order.totalCostCents)}</div>
              </div>
            </div>

            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          <div className="order-details-grid">
            {order.products.map((orderedProduct)=>{
                 const addToCart=async ()=>{
                 
                  await axios.post('/api/cart-items',{
                    productId:orderedProduct.productId, 
                    quantity:orderedProduct.quantity

            });
            await LoadCart();
          }
              return(
              <Fragment key={orderedProduct.productId}>
                  <div className="product-image-container">
              <img src={orderedProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
               {orderedProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on:{dayjs(orderedProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderedProduct.quantity}
              </div>
              <button className="buy-again-button button-primary"
              onClick={addToCart}>
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message" 
                 >Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>

              </Fragment>)

            })}
          
        
          </div>
        </div>)
        })}
     
      </div>
    );
}