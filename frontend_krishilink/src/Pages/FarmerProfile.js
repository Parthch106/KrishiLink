import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import { User, MapPin, Phone, Mail, Briefcase, LogOut, Package } from 'lucide-react';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer'

function App() {
  const [userfn, setuserfn] = useState('');
  const [userln, setuserln] = useState('');
  const [useremail, setuseremail] = useState('');
  const [userphone, setuserphone] = useState('');
  const [useraddress, setuseraddress] = useState('');
  const [userexp, setuserexp] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
    useEffect(() => {
      setuserfn(localStorage.getItem('loggedInUserfn') || 'John');
      setuserln(localStorage.getItem('loggedInUserln') || 'Doe');
      setuseremail(localStorage.getItem('loggedInUsermail') || 'john@example.com');
      setuserphone(localStorage.getItem('loggedInUserphone') || '+1 234 567 890');
      setuseraddress(localStorage.getItem('loggedInUseraddress') || 'New York, USA');
      setuserexp(localStorage.getItem('loggedInUserexp') || '5 years');
    }, [])

    const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUserfn');
      localStorage.removeItem('loggedInUserln');
      localStorage.removeItem('loggedInUseremail');
      localStorage.removeItem('loggedInUserphone');
      localStorage.removeItem('loggedInUseraddress');
      localStorage.removeItem('loggedInUserexp');
      handleSuccess("User Logged out");
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

  return (
    <div>
      <NavBar></NavBar>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
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
                <h1 className="text-3xl font-bold text-gray-900">
                  {userfn} {userln}
                </h1>
                <button
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>

            {/* Profile Details */}
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
                <span className="text-gray-600">{userexp} Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Package className="text-gray-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products && products.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}

export default App;