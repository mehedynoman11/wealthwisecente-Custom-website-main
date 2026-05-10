'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPending(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/user");
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
      setPending(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#ffffff]'>
      <div className='grid lg:grid-cols-2 gap-5 items-center bg-[#fbf8f0] w-11/12 sm:w-1/2 mx-auto rounded-xl border-2 shadow-lg'>

        <form onSubmit={handleSubmit} className='p-8'>
          <img
            className='w-20 mb-6'
            src="/Images/Auth/lion.png"
            alt="Logo"
          />

          <h2 className='text-3xl font-semibold my-3'>
            Sign In Here
          </h2>

          {/* Email */}
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#dcb66b]'
              placeholder='Enter your email'
              required
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-2 mt-4'>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#dcb66b]'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className='text-red-500 mt-3 text-sm'>
              {error}
            </p>
          )}

          {/* Remember me */}
          <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center gap-2'>
              <input type="checkbox" id='remember' />
              <label htmlFor="remember">Remember me</label>
            </div>

            <Link
              href="/forgot-password"
              className='font-semibold text-[#000] hover:underline'
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={pending}
            className='w-full cursor-pointer bg-[#000] text-[#dcb66b] font-semibold py-3 rounded-md mt-4 hover:bg-[#333] transition duration-300'
          >
            {pending ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className='text-center mt-4 text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className='font-semibold text-[#000] hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </form>

        {/* Right side image */}
        <div className='lg:block hidden'>
          <img
            className='h-full w-full object-cover rounded-r-xl'
            src="/Images/Auth/login.png"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;