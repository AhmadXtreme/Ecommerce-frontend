import dayjs from 'dayjs'
import { useState } from 'react'
import { formatPrice } from '../../utils/money'
import axios from 'axios'

export function OrderSummary({ cart, deliveryOption, LoadCart }) {
  const [editingProductId, setEditingProductId] = useState(null)
  const [newQuantity, setNewQuantity] = useState(1)

  return (
    <div className="order-summary">
      {deliveryOption.length > 0 && cart.map((cartItem) => {
        const selectedDeliveryOption = deliveryOption.find((singleOption) => {
          return singleOption.id === cartItem.deliveryOptionId
        })

        const isEditing = editingProductId === cartItem.productId

        const deleteCartItem = async () => {
          await axios.delete(`/api/cart-items/${cartItem.productId}`)
          await LoadCart()
        }

        const startEditing = () => {
          setEditingProductId(cartItem.productId)
          setNewQuantity(cartItem.quantity)
        }

        const saveQuantity = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: newQuantity,
          })
          await LoadCart()
          setEditingProductId(null)
        }

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">{formatPrice(cartItem.product.priceCents)}</div>

                <div className="product-quantity">
                  <span>
                    Quantity:{' '}
                    {isEditing ? (
                      <select
                        className="quantity-select"
                        value={newQuantity}
                        onChange={(event) => setNewQuantity(Number(event.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="quantity-label">{cartItem.quantity}</span>
                    )}
                  </span>

                  {isEditing ? (
                    <span className="update-quantity-link link-primary" onClick={saveQuantity}>
                      Save
                    </span>
                  ) : (
                    <span className="update-quantity-link link-primary" onClick={startEditing}>
                      Update
                    </span>
                  )}

                  <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">Choose a delivery option:</div>

                {deliveryOption.map((option) => {
                  const priceString = option.priceCents > 0 ? formatPrice(option.priceCents) : 'Free Shipping'

                  const updateDeliveryOption = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                      deliveryOptionId: option.id,
                    })
                    await LoadCart()
                  }

                  return (
                    <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
                      <input
                        type="radio"
                        checked={option.id === cartItem.deliveryOptionId}
                        onChange={() => {}}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`}
                      />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">{priceString}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}