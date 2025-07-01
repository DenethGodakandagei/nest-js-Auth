'use client'
import React, { useRef } from 'react';
import { Backend_Url } from '../lib/Constants';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const data = useRef<FormInputs>({
    name: '',
    email: '',
    password: '',
  });

  const register = async () => {
    try {
      const res = await fetch(`${Backend_Url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.current),
      });

      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      const response = await res.json();
      alert('User Registered');
      console.log({ response });
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => (data.current.name = e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => (data.current.email = e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => (data.current.password = e.target.value)}
          />
        </div>

        <button
          onClick={register}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
