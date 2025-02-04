import React from "react";
import NavBar from '../Navbar/NavBar';

const EmployeeVerification = () => {
  return (
    <div className="p-6">
      <NavBar></NavBar>
      <h1 className="text-2xl font-bold">Employee Verification</h1>
      <p className="mt-2 text-gray-600">Verify and update product details after physical inspection.</p>
    </div>
  );
};

export default EmployeeVerification;
