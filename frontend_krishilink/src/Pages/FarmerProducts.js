import React from "react";
import NavBar from '../Navbar/NavBar';

const FarmerProducts = () => {
  return (
    <div className="p-6">
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold">Farmer Products</h1>
      <p className="mt-2 text-gray-600">View available products and crop statistics.</p>
    </div>
  );
};

export default FarmerProducts;
