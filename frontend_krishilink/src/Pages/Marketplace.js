import React from "react";
import NavBar from '../Navbar/NavBar';

const Marketplace = () => {
  return (
    <div className="p-6">
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <p className="mt-2 text-gray-600">Bid on MSP products or upload new ones.</p>
    </div>
  );
};

export default Marketplace;
