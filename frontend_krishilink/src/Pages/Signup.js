import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import SelectTag from "../components/SelectTag";
import {
  Tractor,
  Sprout,
  LeafyGreen,
  Users,
  LineChart,
} from "lucide-react";
import { TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
// import './loginsignup.css'

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const names = [
        "Wheat",
        "Corn",
        "Rice",
        "Soybean",
        "Barley",
        "Oats",
        "Cotton",
        "Sugarcane",
        "Potato",
        "Tomato"
      ];

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
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
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
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        // <div className='signup-container'>
        // <div className='container'>
        //     <form onSubmit={handleSignup}>
        //         <div>
        //         <h1 className='h1'>Signup</h1>
        //             <label htmlFor='name'>Name</label>
        //             <input
        //                 onChange={handleChange}
        //                 type='text'
        //                 name='name'
        //                 autoFocus
        //                 placeholder='Enter your name...'
        //                 value={signupInfo.name}
        //             /><FaUser className='icon1'/>
        //         </div>
        //         <div>
        //             <label htmlFor='email'>Email</label>
        //             <input
        //                 onChange={handleChange}
        //                 type='email'
        //                 name='email'
        //                 placeholder='Enter your email...'
        //                 value={signupInfo.email}
        //             /><FaEnvelope className='icon2'/>
        //         </div>
        //         <div>
        //             <label htmlFor='password'>Password</label>
        //             <input
        //                 onChange={handleChange}
        //                 type='password'
        //                 name='password'
        //                 placeholder='Enter your password...'
        //                 value={signupInfo.password}
        //             /><FaLock className='icon1'/>
        //         </div>
        //         <button className='button1' type='submit'>Signup</button>
        //         <span>Already have an account ?
        //             <Link to="/login">Login</Link>
        //         </span>
        //     </form>
        //     <ToastContainer />
        // </div>
        // </div>

        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Website Info */}
          <div className="lg:w-1/2 space-y-6 bg-white rounded-2xl shadow-md">
            <div className="text-center lg:text-left bg-white rounded-xl p-8">
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-green-100 blur"></div>
                  <Tractor className="relative h-20 w-20 text-green-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Krishi Link
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Empowering farmers with innovative solutions for sustainable
                agriculture
              </p>
              <p className="text-gray-500">
                Join thousands of farmers who are transforming their
                agricultural practices with modern technology and sustainable
                methods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sustainable Farming
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Adopt eco-friendly methods to benefit both your farm’s
                  productivity and the environment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <LeafyGreen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Direct Sales
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Sell your farm products directly to buyers, eliminating
                  middlemen and ensuring better profits for you.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Farmer Community
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Connect with other farmers to share insights, experiences, and
                  build a supportive network.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <LineChart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Growth Analytics
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Track your farm's performance with advanced analytics and
                  insights.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Farmer Registration
                </h2>
                <p className="mt-2 text-gray-600">
                  Join our farming community and grow together
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <TextField
                      required
                      label="First Name"
                      name="firstName"
                      value={signupInfo.firstName}
                      onChange={handleChange}
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <TextField
                      required
                      label="Last Name"
                      name="lastName"
                      value={signupInfo.lastName}
                      onChange={handleChange}
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <TextField
                      required
                      label="Email"
                      name="email"
                      value={signupInfo.email}
                      onChange={handleChange}
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div>
                    <TextField
                      required
                      label="Phone Number"
                      name="phone"
                      type="number"
                      value={signupInfo.phone}
                      onChange={handleChange}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <Textarea
                    size="lg"
                    name="address"
                    placeholder="Address"
                    value={signupInfo.address}
                    onChange={handleChange}
                    minRows={3}
                  />

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <TextField
                      required
                      label="Farm Size (acres)"
                      type="number"
                      name="farmSize"
                      value={signupInfo.farmSize}
                      onChange={handleChange}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />

                    {/* <div>
                      <SelectTag names={names} />
                    </div> */}
                  </div>

                  <div>
                    <TextField
                      required
                      label="Farming Experience (Years)"
                      type="number"
                      name="experience"
                      value={signupInfo.experience}
                      onChange={handleChange}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Register as Farmer
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              Already registered?{" "}
              <Link
                to={'/login'}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Signup
