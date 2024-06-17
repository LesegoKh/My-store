// Import Files & Components
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../features/cartSlice';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // State for shipment method and total cost
  const [shipmentMethod, setShipmentMethod] = useState('collection'); // Default to collection
  const [totalCost, setTotalCost] = useState(0); // Initialize total cost
  const [showHelp, setShowHelp] = useState(false); // State to manage help display
  const [showThankYou, setShowThankYou] = useState(false); // State to show thank you message

  // Update cart state on changes
  useEffect(() => {
    // Calculate total cost whenever cart items change
    let baseTotal = cart.items.reduce((acc, item) => acc + item.price, 0);
    if (shipmentMethod === 'delivery') {
      baseTotal += 50; // Add R50 for delivery
    }
    setTotalCost(baseTotal);
  }, [cart.items, shipmentMethod]);

  // Function to handle method selection
  const handleMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setShipmentMethod(selectedMethod);

    let baseTotal = cart.items.reduce((acc, item) => acc + item.price, 0);
    if (selectedMethod === 'delivery') {
      baseTotal += 50; // Add R50 for delivery
    }
    setTotalCost(baseTotal);
  };

  // Function to clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
    setTotalCost(0); // Reset total cost to zero after clearing cart
  };

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setShowHelp(!showHelp); // Toggle help display
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (cart.items.length === 0) {
      return; // Do not proceed if cart is empty
    }

    // Perform checkout logic here, e.g., place order, clear cart, etc.
    dispatch(clearCart());
    setTotalCost(0); // Reset total cost to zero after clearing cart
    setShowThankYou(true); // Show thank you message
  };

  // Prevent page refresh after checkout
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (showThankYou) {
        const confirmationMessage = 'Are you sure you want to leave?';
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showThankYou]);

  return (
    <div className="container mt-5">
      <h1>Cart</h1>
      {showThankYou ? (
        <div className="alert alert-success" role="alert">
          Order placed!
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.items.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                {item.name}
                <span>R{item.price.toFixed(2)}</span> {/* Display price in Rands */}
                <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item))}>Remove</button>
              </li>
            ))}
          </ul>

          {/* Method selection */}
          <div className="mb-3">
            <label>Select Shipment Method:</label>
            <div className="form-check">
              <input
                type="radio"
                id="collection"
                name="shipmentMethod"
                value="collection"
                checked={shipmentMethod === 'collection'}
                onChange={handleMethodChange}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="collection">Collection (Fee: R0)</label> {/* Update fee to Rands */}
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="delivery"
                name="shipmentMethod"
                value="delivery"
                checked={shipmentMethod === 'delivery'}
                onChange={handleMethodChange}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="delivery">Delivery (Fee: R50)</label> {/* Update fee to Rands */}
            </div>
          </div>

          {/* Display total cost */}
          <h3>Total: R{totalCost.toFixed(2)}</h3> {/* Display total cost in Rands */}
          
          {/* Help information */}
          {showHelp && (
            <div className="mb-3">
              <h2>Collections Mon-Sat 09h00 - 16h30</h2>
              <p>Collection Address: 12 Roeland Street, Goodwood, Cape Town, 7925</p>
              <p>For More info on collections - Call Peter: 082-345-978</p>
              <p>Delivery timeframe: 3-5 Working Days (Metro cities: 2-3 Working Days)</p>
            </div>
          )}

          {/* Help button */}
          <button className="btn btn-info mb-3" onClick={toggleHelpModal}>Help</button>

          {/* Buttons */}
          <div className="mb-3">
            <button className="btn btn-primary me-3" onClick={handleClearCart}>Clear Cart</button>
            <button className="btn btn-success" onClick={handleCheckout} disabled={cart.items.length === 0}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
