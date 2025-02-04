import React from "react";
import NavBar from '../Navbar/NavBar';

const BusinessDashboard = () => {
  return (
    <div className="p-6">
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold">Business Dashboard</h1>
      <p className="mt-2 text-gray-600">Track your bids, purchases, and sales statistics.</p>
    </div>
  );
};

export default BusinessDashboard;
