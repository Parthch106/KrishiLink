import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Textarea } from "@mui/joy";
import {
  Tractor,
  Sprout,
  LeafyGreen,
  Users,
  LineChart,
} from "lucide-react";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        farmSize: '',
        experience: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      const copySignupInfo = { ...signupInfo };
      copySignupInfo[name] = value;
      setSignupInfo(copySignupInfo);
    } 

    const handleSignup = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, address, farmSize, experience, password } = signupInfo;
        
        if (!firstName || !lastName || !email || !phone || !address || !farmSize || !experience || !password) {
            return handleError('All fields are required');
        }

        try {
            const url = `http://localhost:8080/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side - Website Info */}
                    <div className="lg:w-1/2 space-y-6 bg-white rounded-2xl shadow-md">
                        <div className="text-center lg:text-left bg-white rounded-xl p-8">
                            <div className="flex justify-center lg:justify-start mb-4">
                                <Tractor className="relative h-20 w-20 text-green-600" />
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                Krishi Link
                            </h1>
                            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                                Empowering farmers with innovative solutions for sustainable agriculture.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-6">
                                <Sprout className="h-6 w-6 text-green-600 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">Sustainable Farming</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Adopt eco-friendly methods to benefit both your farm’s productivity and the environment.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6">
                                <LeafyGreen className="h-6 w-6 text-green-600 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">Direct Sales</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Sell your farm products directly to buyers, eliminating middlemen and ensuring better profits for you.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6">
                                <Users className="h-6 w-6 text-green-600 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">Farmer Community</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Connect with other farmers to share insights, experiences, and build a supportive network.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6">
                                <LineChart className="h-6 w-6 text-green-600 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900">Growth Analytics</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Track your farm's performance with advanced analytics and insights.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Farmer Registration</h2>
                                <p className="mt-2 text-gray-600">Join our farming community and grow together</p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={signupInfo.firstName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={signupInfo.lastName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={signupInfo.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                    <input
                                        required
                                        type="number"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={signupInfo.phone}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>

                                <Textarea
                                    size="lg"
                                    name="address"
                                    placeholder="Address"
                                    value={signupInfo.address}
                                    onChange={handleChange}
                                    minRows={3}
                                    className="w-full border rounded-lg p-3"
                                />

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <input
                                        required
                                        type="number"
                                        name="farmSize"
                                        placeholder="Farm Size (acres)"
                                        value={signupInfo.farmSize}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                    <input
                                        required
                                        type="number"
                                        name="experience"
                                        placeholder="Farming Experience (Years)"
                                        value={signupInfo.experience}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3"
                                    />
                                </div>

                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signupInfo.password}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200"
                                >
                                    Register as Farmer
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            Already registered?{" "}
                            <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default Signup;
