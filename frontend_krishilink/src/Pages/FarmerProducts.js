import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { handleError } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'
import { IndianRupee, MapPin, Package, Star, User, Box } from "lucide-react";


const categories = ["Vegetables", "Fruits", "Dairy & Eggs", "Herbs", "Honey & Preserves", "Bakery"];

export default function ProductUpload() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    farmer: "",
    location: "",
    category: "",
    unit: "",
    stock: "",
    rating: "",
    userId: localStorage.getItem("loggedInUserID"),
  });

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/products", {
  //       headers: {
  //         Authorization: localStorage.getItem("token") || "",
  //       },
  //     });
  //     const result = await response.json();
  //     setProducts(result);
  //   } catch (err) {
  //     toast.error("Failed to fetch products");
  //   }
  // };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/products", formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "application/json",
        },
      });
      toast.success("Product added successfully!");
      fetchProducts();
      setFormData({
        name: "",
        price: "",
        image: "",
        farmer: "",
        location: "",
        category: "",
        unit: "",
        stock: "",
        rating: "",
      });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <NavBar></NavBar>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Farmer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="farmer"
                  value={formData.farmer}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter farmer name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <div className="relative">
                <Package className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., lb, dozen"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <div className="relative">
                <Box className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter stock quantity"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="relative">
                <Star className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.0 - 5.0"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Added By You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
    <Footer></Footer>
    </div>
  );
}