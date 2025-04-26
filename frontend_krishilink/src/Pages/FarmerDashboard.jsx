import React from "react";
import NavBar from '../Navbar/NavBar';

const FarmerDashboard = () => {
  return (
    <div className="p-6">
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
      <p className="mt-2 text-gray-600">View profile details, products, purchase & sales history.</p>
    </div>
  );
};

export default FarmerDashboard;
