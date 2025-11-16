import React, { useState } from 'react';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const ForgotPass = () => {

  return (
    <section className="py-12">
      <Container>
        <div className="max-w-full md:max-w-xl mx-auto bg-violet-950 rounded-2xl shadow-2xl">
          <div className="px-12 py-16">
            <Link to="/login" className="flex items-center gap-2 text-white text-lg font-jose mb-6 hover:underline">
              <FaArrowLeft /> Back to Login
            </Link>
            <h2 className="text-white font-bold font-lat text-[25px] pb-2 text-center">
              Forgot Your Password?
            </h2>
            <p className="text-gray-300 text-center text-[18px] font-jose mb-8">
              Enter your registered email to receive a password reset link.
            </p>
            <form action="forgot-password">
              <div>
                <label className="text-white text-[20px] font-bold font-jose">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter Your Email"
                  className="py-3 px-4 w-full h-full bg-white rounded-[5px] text-[20px] font-bold font-jose 
                outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 
                focus:ring-blue-500 mb-4 placeholder:text-[20px] placeholder:font-bold placeholder:font-jose mt-2"
                />
              </div>
              <button
                className="text-[20px] font-bold font-jose w-full py-2 bg-fuchsia-600 rounded-[5px] text-white cursor-pointer
                hover:bg-fuchsia-400 transition-all duration-300 ease-in-out mt-4"
              >
                Send Reset Link
              </button>
            </form>
            <p className="text-[20px] font-bold font-jose text-center text-pink-400 pt-8">
              <Link to="/login" className="hover:underline text-emerald-400">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForgotPass;
