import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Search, RefreshCw, Star, User, Box, MapPin } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

const EmployeeApproval = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchPendingProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/approve/false', {
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      const result = await response.json();
      console.log("API Response:", result);

      if (Array.isArray(result)) {
        setPendingProducts(result);
        const uniqueCategories = [...new Set(result.map(product => product.category))];
        setCategories(uniqueCategories);
      } else {
        setError("Invalid data received from server");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const approveProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/approve/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      });

      const text = await response.text();
      console.log("Raw Response:", text);

      try {
        const data = JSON.parse(text);
        console.log("Approval Response:", data);

        if (response.ok) {
          handleSuccess("Product Approved!");
          setPendingProducts(pendingProducts.filter(product => product._id !== productId));
        } else {
          handleError("Approval failed! " + (data.message || "Unknown error"));
        }
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        alert("Server returned invalid JSON.");
      }
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const rejectProduct = async (productId) => {
    try {
      setPendingProducts(pendingProducts.filter(product => product._id !== productId));
      handleError("Product rejected successfully!");
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  const filteredProducts = pendingProducts.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterCategory === '' || product.category === filterCategory)
  );

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pending Product Approvals</h2>
          <button onClick={fetchPendingProducts} className="text-blue-600 flex items-center">
            <RefreshCw className="h-5 w-5 mr-2" /> Refresh
          </button>
        </header>

        <div className="flex space-x-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg py-2 px-4"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500">No pending products found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                  <div className="mt-4 flex justify-between">
                    <button onClick={() => approveProduct(product._id)} className="text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                    </button>
                    <button onClick={() => rejectProduct(product._id)} className="text-red-600 flex items-center">
                      <X className="h-4 w-4 mr-2" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default EmployeeApproval;
