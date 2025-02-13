// import React, { useEffect, useState } from 'react';
// // import './home.css';
// import NavBar from '../Navbar/NavBar';
// // import axios from 'axios';

// function Home() {
//   const [loggedInUser, setLoggedInUser] = useState('');

//   // Fetch the saved data and logged-in user
//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));

//   }, []);

//   return (
//     <div>
//       <NavBar />
//       <div>
//         <h1 className="welcome-message">
//           Welcome!
//         </h1>
//         {loggedInUser && (
//           <h2 className="user-greeting">Hello, {loggedInUser}!</h2>
//         )}
//         <p className="slogan">
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import {
  Sprout,
  ShoppingBasket,
  TrendingUp,
  Truck,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Leaf,
  Users,
  Shield,
  Clock,
  Zap,
  HandCoins,
  Plane as Plant,
} from "lucide-react";
import { Link } from "react-router-dom";
// import ProductCard from './components/ProductCard';
// import { products } from './data/products';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");

  // Fetch the saved data and logged-in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  
  return (
    <div className="min-h-screen bg-green-600">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8" />
            <span className="text-2xl font-bold">Krishi Link</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-green-200">
              Home
            </a>
            <a href="#" className="hover:text-green-200">
              Products
            </a>
            <a href="#" className="hover:text-green-200">
              About
            </a>
            <a href="#" className="hover:text-green-200">
              Contact
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Farm to Fork, Every Day
              {/* Fresh From Farm to Your Table, Every Single Day */}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-green-100">
              Discover unparalleled freshness with Krishi Link—directly
              connecting you to local farmers for sustainable, fair-priced
              produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors text-lg"
                to={"/marketplace"}
              >
                Start Shopping
              </Link>
              <Link
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg"
                to={"/signup"}
              >
                Join as Farmer
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Krishi Link?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the way fresh produce reaches your table,
              creating a sustainable ecosystem that benefits both farmers and
              consumers.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Fresh</h3>
              <p className="text-gray-600">
                Direct from farms to your doorstep
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmer Support</h3>
              <p className="text-gray-600">
                Empowering local farmers with fair compensation
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Rigorous quality checks at every step
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-600">
                Scheduled deliveries at your convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for both farmers and consumers, making
              fresh produce accessible to everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Quick Distribution</h3>
              <p className="text-gray-600 mb-4">
                Efficient logistics network ensuring your produce reaches
                customers while it's still farm-fresh.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Same-day delivery options
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Temperature-controlled transport
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Real-time delivery tracking
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <HandCoins className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Fair Pricing</h3>
              <p className="text-gray-600 mb-4">
                Transparent pricing model that benefits both farmers and
                consumers.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Direct farmer payments
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  No hidden fees
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Bulk purchase discounts
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Plant className="h-12 w-12 text-green-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Quality Control</h3>
              <p className="text-gray-600 mb-4">
                Stringent quality checks ensuring only the best produce reaches
                your table.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Expert quality inspection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Organic certification
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Freshness guarantee
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <ShoppingBasket className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Direct from Farmers
              </h3>
              <p className="text-gray-600">
                Fresh products sourced directly from local farmers
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fair Pricing</h3>
              <p className="text-gray-600">
                Better prices for farmers and consumers
              </p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Fast and reliable delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-green-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">About Krishi Link</h4>
              <p className="text-green-100">
                Delivering fresh, premium farm products from local fields
                directly to companies. Experience the farm-to-business journey
                that fuels sustainable growth and quality.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-100 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white">
                    Farmers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-100 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-green-100">
                <li>Email: info@krishilink.com</li>
                <li>Phone: +91 1234567890</li>
                <li>
                  Address: 152, Shree Residency, Piplod Road, Surat, Gujarat
                  395007, India
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  className="hover:text-green-200"
                >
                  <Facebook />
                </a>
                <a href="https://www.x.com" className="hover:text-green-200">
                  <Twitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="hover:text-green-200"
                >
                  <Instagram />
                </a>
                <a
                  href="https://www.youtube.com"
                  className="hover:text-green-200"
                >
                  <Youtube />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
            <p>
              &copy; {new Date().getFullYear()} Krishi Link. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
