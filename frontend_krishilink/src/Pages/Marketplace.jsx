import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
// import ProductCard from '../components/ProductCard';
// import { products, categories } from '../data/products';

const products = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1935&auto=format&fit=crop&q=80",
    farmer: "John Smith",
    location: "Green Valley Farm, CA",
    category: "Vegetables",
    unit: "lb",
    stock: 150,
    rating: 4.8
  },
  {
    id: 2,
    name: "Farm Fresh Eggs",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1593462430565-94f606c65e71?q=80&w=2070&auto=format&fit=crop&q=80",
    farmer: "Sarah Johnson",
    location: "Happy Hens Farm, OR",
    category: "Dairy & Eggs",
    unit: "dozen",
    stock: 80,
    rating: 4.9
  },
  {
    id: 3,
    name: "Organic Carrots Bundle",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Mike Williams",
    location: "Sunrise Organic Farm, WA",
    category: "Vegetables",
    unit: "bundle",
    stock: 100,
    rating: 4.7
  },
  {
    id: 4,
    name: "Fresh Strawberries",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Emily Brown",
    location: "Berry Good Farm, CA",
    category: "Fruits",
    unit: "basket",
    stock: 60,
    rating: 4.9
  },
  {
    id: 5,
    name: "Organic Lettuce",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "David Miller",
    location: "Fresh Greens Farm, OR",
    category: "Vegetables",
    unit: "head",
    stock: 90,
    rating: 4.6
  },
  {
    id: 6,
    name: "Local Honey",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Lisa Anderson",
    location: "Busy Bee Apiary, WA",
    category: "Honey & Preserves",
    unit: "jar",
    stock: 40,
    rating: 5.0
  },
  {
    id: 7,
    name: "Fresh Milk",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Robert Wilson",
    location: "Green Meadows Dairy, OR",
    category: "Dairy & Eggs",
    unit: "gallon",
    stock: 70,
    rating: 4.8
  },
  {
    id: 8,
    name: "Organic Apples",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1569870499705-504209102861?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "James Thompson",
    location: "Apple Valley Orchards, WA",
    category: "Fruits",
    unit: "lb",
    stock: 120,
    rating: 4.7
  },
  {
    id: 9,
    name: "Fresh Basil",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Maria Garcia",
    location: "Herb Haven Farm, CA",
    category: "Herbs",
    unit: "bunch",
    stock: 45,
    rating: 4.9
  },
  {
    id: 10,
    name: "Organic Potatoes",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Tom Baker",
    location: "Root Crop Farm, OR",
    category: "Vegetables",
    unit: "lb",
    stock: 200,
    rating: 4.6
  },
  {
    id: 11,
    name: "Fresh Bread",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Anna Martinez",
    location: "Artisan Bakery, WA",
    category: "Bakery",
    unit: "loaf",
    stock: 30,
    rating: 4.9
  },
  {
    id: 12,
    name: "Organic Mushrooms",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    farmer: "Chris Lee",
    location: "Forest Floor Farm, OR",
    category: "Vegetables",
    unit: "lb",
    stock: 50,
    rating: 4.8
  }
];

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Herbs",
  "Honey & Preserves",
  "Bakery"
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.location.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div>
      <NavBar></NavBar>
    <div className="min-h-screen bg-gray-50 py-8">
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <p className="text-gray-600">Discover fresh, local produce directly from farmers</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products, farmers, or locations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-gray-400 h-5 w-5" />
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-sm text-green-600 font-medium">{product.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <p>by {product.farmer}</p>
                  <p>{product.location}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500">per {product.unit}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {product.stock} units available
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Marketplace;