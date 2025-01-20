import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";
import Header from "../components/Header";

const CartPage = () => {
  const { user } = useAuthStore();
  const { cart, fetchCart, updateItemQuantity, removeItem } = useCartStore();

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  useEffect(() => {
    fetchCart(user._id);
  }, [user]);

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill={index < rating ? "gold" : "gray"}
        viewBox="0 0 24 24"
      >
        <path d="M12 17.3l-6.6 4.4 5-7.6-6.8-5.6 8.2-.7L12 0l2.2 7.7 8.2 .7-6.8 5.6 5 7.6L12 17.3z" />
      </svg>
    ));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Shopping Cart</h2>
            {cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Ratings: {item.product.reviews || "N/A"}</p>

                        {/* Star Rating */}
                        <div className="flex items-center mt-2">
                          {renderStarRating(item.product.rating)}
                        </div>

                        {/* Quantity Adjustment */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() =>
                              updateItemQuantity(user._id, item.product._id, item.quantity - 1)
                            }
                            className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(user._id, item.product._id, parseInt(e.target.value))
                            }
                            className="w-12 text-center border border-gray-300 rounded-lg"
                          />
                          <button
                            onClick={() =>
                              updateItemQuantity(user._id, item.product._id, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mt-4">
                          {item.product.richDescription || "No description available."}
                        </p>
                      </div>
                    </div>

                    {/* Price & Remove Button */}
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col items-end">
                      <p className="text-xl font-semibold text-gray-900">
                        GH¢ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(user._id, item.product._id)}
                        className="mt-2 text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-4">Your cart is empty.</p>
            )}
          </div>

          {/* Right Column - Checkout & Delivery Details */}
          <div className="bg-white rounded-lg shadow-xl p-6 sticky top-16 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Subtotal</span>
                <span>GH¢{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
                <span>Total</span>
                <span>GH¢{calculateSubtotal().toFixed(2)}</span>
              </div>
              <a href="/order-page">
                <button
                  className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Proceed to Checkout
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;