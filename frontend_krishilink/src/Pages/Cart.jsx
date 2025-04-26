import React, { useEffect, useState } from "react";
import { Leaf, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const deleteProduct = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * item.stock,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div><NavBar></NavBar>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-white rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any fresh produce to your cart yet.
            Explore our farmers' marketplace to find fresh, locally grown
            products.
          </p>
          <Link to={"/marketplace"}>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center cursor-pointer">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Browse Products
            </button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
      </div>
    );
  }

  return (
    <div><NavBar></NavBar>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Your KrishiLink Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="p-6 border-b border-gray-200 last:border-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Farmer: {item.farmer}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock Available: {item.stock} /{item.unit}
                      </p>
                      <p className="text-lg font-medium text-green-600 mt-1">
                        ₹{item.price} per {item.unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="flex items-center text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>
              <NavLink to="/pdf" className="hover:text-green-200">
              <button className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Proceed to Checkout
              </button>
              </NavLink>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

export default Cart;