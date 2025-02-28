import { Navigate, Route, Routes } from 'react-router-dom';
import RefrshHandler from './RefrshHandler';
import { useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import FarmerRegistration from "./Pages/FarmerRegistration";
import FarmerProducts from "./Pages/FarmerProducts";
import EmployeeVerification from "./Pages/EmployeeVerification";
import Marketplace from "./Pages/Marketplace";
import FarmerDashboard from "./Pages/FarmerDashboard";
import BusinessDashboard from "./Pages/BusinessDashboard";
import ForgotPassword from './Pages/ForgotPassword';
import FarmerProfile from './Pages/FarmerProfile';
import EmployeeApproval from './Pages/EmployeeApproval';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path="/register" element={<FarmerRegistration />} />
        <Route path="/products" element={<FarmerProducts />} />
        <Route path="/employee" element={<EmployeeVerification />} />
        <Route path="/profile" element={<FarmerProfile />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/employeeaprroval" element={<EmployeeApproval />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
