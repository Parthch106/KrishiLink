import React, { useEffect, useState } from 'react';
import { MapPin, Package, Star, User, Box, Mail, Phone, Briefcase } from "lucide-react";
import { handleError } from '../utils';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';


function App() {
  const [userfn, setuserfn] = useState('');
  const [userln, setuserln] = useState('');
  const [useremail, setuseremail] = useState('');
  const [userphone, setuserphone] = useState('');
  const [useraddress, setuseraddress] = useState('');
  const [userexp, setuserexp] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setuserfn(localStorage.getItem('loggedInUserfn'));
    setuserln(localStorage.getItem('loggedInUserln'));
    setuseremail(localStorage.getItem('loggedInUsermail'));
    setuserphone(localStorage.getItem('loggedInUserphone'));
    setuseraddress(localStorage.getItem('loggedInUseraddress'));
    setuserexp(localStorage.getItem('loggedInUserexp'));
  }, []);

  const fetchProducts = async () => {
    try {
      const userId = localStorage.getItem('loggedInUserID'); 
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const url = `http://localhost:8080/farmers?userId=${userId}`; 
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
    <div className="min-h-screen bg-gray-100">
      <NavBar></NavBar>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex items-center">
              <div className="-mt-16">
                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="ml-6 -mt-6">
                <h1 className="text-3xl font-bold text-gray-900">{userfn} {userln}</h1>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" />
                <span className="text-gray-600">{useremail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" />
                <span className="text-gray-600">{userphone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-400" />
                <span className="text-gray-600">{useraddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="text-gray-400" />
                <span className="text-gray-600">{userexp} Years of Farming Experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="text-gray-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${product.approved ? '' : 'border-2 border-red-500'}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        ₹{product.price}/{product.unit}
                      </span>
                      <span className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {product.rating}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {product.farmer}
                      </span>
                      <span className="flex items-center">
                        <Box className="h-4 w-4 mr-1" />
                        Stock: {product.stock}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </p>
                    <p className={`mt-2 text-sm font-semibold ${product.approved ? 'text-green-600' : 'text-red-600'}`}>
                      {product.approved ? 'Approved' : 'Approval Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    <Footer></Footer>
    </div>
  );
}

export default App;
