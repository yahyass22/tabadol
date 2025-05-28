"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Repeat, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/login-dialog";
import { SignupDialog } from "@/components/signup-dialog";
import LoginButton from "@/components/auth/login-button";

// Define animation variants for framer-motion
const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="relative overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 flex items-center"
                >
                  <Repeat className="mr-2 h-8 w-8 text-purple-600" />
                  SWAP ON
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="hidden md:flex ml-10 space-x-8"
              >
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-purple-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300"
                >
                  How It Works
                </Link>
                <Link
                  href="/browse"
                  className="text-gray-600 hover:text-purple-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300"
                >
                  Browse
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-purple-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-600 after:transition-all after:duration-300"
                >
                  About Us
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <LoginButton />
              )}
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-purple-700">
              Trade Goods & Services Without Money
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join our community-driven marketplace where you can exchange what
              you have for what you need.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-300/50 transition-all duration-300 text-lg rounded-full px-8"
                onClick={() => setShowSignupDialog(true)}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                   className="bg-gradient-to-r from-blue-600 to-purple-300 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-300/50 transition-all duration-300 text-lg rounded-full px-8"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 h-20 bottom-0 left-0 right-0"></div>
              <Image
                src="/brt.png"
                alt="Barter Exchange Platform"
                width={1200}
                height={630}
               className="rounded-2xl shadow-[0_25px_75px_rgba(155,135,245,0.4)] w-full h-auto"

                priority
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 relative inline-block"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                How BarterHub Works
              </span>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-600 rounded-full"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mt-6"
            >
              Our platform makes it easy to exchange goods and services without using money.
            </motion.p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div
              variants={item}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Items</h3>
              <p className="text-gray-600">
                Create listings for items or services you want to trade. Add
                photos and describe what you're looking for in return.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Matches</h3>
              <p className="text-gray-600">
                Browse listings or let our system find potential matches for your items based on what you're looking
                for.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-100 transition-all duration-300"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform transition-transform hover:scale-110 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Make The Exchange</h3>
              <p className="text-gray-600">
                Connect with other users, agree on terms, and complete your barter exchange safely and securely.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with Modern Cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                What Our Users Say
              </span>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-purple-600 rounded-full"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              Join thousands of satisfied users who are already trading on our platform.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-300 rounded-full blur-sm opacity-50"></div>
                  <Image
                    src="/mbr1.JPG"
                    alt="User"
                    width={50}
                    height={50}
                    className="relative w-14 h-14 rounded-full mr-4 border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">John Doe</h4>
                  <p className="text-purple-600 text-sm">Portland, OR</p>
                </div>
                <div className="ml-auto text-purple-200 text-4xl">"</div>
              </div>
              <p className="text-gray-600 italic">
                I traded my old camera equipment for professional web design services. Saved me thousands of dollars
                and connected me with a talented designer!
              </p>
              <div className="mt-6 text-yellow-400 flex">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-300 rounded-full blur-sm opacity-50"></div>
                  <Image
                    src="/mbr1.JPG"
                    alt="User"
                    width={50}
                    height={50}
                    className="relative w-14 h-14 rounded-full mr-4 border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Sarah Johnson</h4>
                  <p className="text-purple-600 text-sm">Seattle, WA</p>
                </div>
                <div className="ml-auto text-purple-200 text-4xl">"</div>
              </div>
              <p className="text-gray-600 italic">
                As a freelance designer, I've been able to furnish my entire home office through trades. The platform
                is intuitive and the community is amazing.
              </p>
              <div className="mt-6 text-yellow-400 flex">
                <span>★★★★★</span>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-300 rounded-full blur-sm opacity-50"></div>
                  <Image
                    src="/brt.png"
                    alt="User"
                    width={50}
                    height={50}
                    className="relative w-14 h-14 rounded-full mr-4 border-2 border-white"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Michael Rodriguez</h4>
                  <p className="text-purple-600 text-sm">Austin, TX</p>
                </div>
                <div className="ml-auto text-purple-200 text-4xl">"</div>
              </div>
              <p className="text-gray-600 italic">
                I've completed over 20 trades in the past year. The messaging system makes communication easy, and I've
                met some great people along the way.
              </p>
              <div className="mt-6 text-yellow-400 flex">
                <span>★★★★★</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Bartering?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join our community today and discover a new way to exchange goods and services without spending money.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-purple-600 text-lg rounded-full px-8 shadow-lg shadow-purple-900/30"
              onClick={() => setShowSignupDialog(true)}
            >
              Create Your Free Account
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges with Modern Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:scale-110">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Exchanges</h3>
              <p className="text-gray-600">
                Our platform includes verification and review systems to ensure safe transactions.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:scale-110">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
              <p className="text-gray-600">Join thousands of users already exchanging goods and services.</p>
            </div>
            <div className="flex flex-col items-center p-6 hover:bg-gray-50 rounded-xl transition-colors duration-300">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Money Needed</h3>
              <p className="text-gray-600">Exchange goods and services directly without using cash.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="text-2xl font-bold flex items-center mb-6">
                <Repeat className="mr-2 h-7 w-7" />
                SWAP ON
              </Link>
              <p className="text-gray-300">
                A community-driven marketplace for trading goods and services without money.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-purple-300">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-purple-300">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-gray-300 hover:text-white transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6 text-purple-300">Stay Connected</h4>
              <div className="flex space-x-5">
                <a href="#" className="text-gray-300 hover:text-white transition-colors rounded-full bg-gray-800 p-2 hover:bg-gray-700">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors rounded-full bg-gray-800 p-2 hover:bg-gray-700">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08zm-.081 1.802h-.08c-2.744 0-3.07.01-4.122.06-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.052-.06 1.378-.06 4.122v.08c0 2.744.01 3.07.06 4.122.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.052.05 1.378.06 4.122.06h.08c 2.744 0 3.07-.01 4.122-.06.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.05-1.052.06-1.378.06-4.122v-.08c0-2.744-.01-3.07-.06-4.122-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.052-.05-1.378-.06-4.122-.06zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors rounded-full bg-gray-800 p-2 hover:bg-gray-700">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-gray-400 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2023 SWAP ON. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        setShowSignup={setShowSignupDialog}
      />

      {/* Signup Dialog */}
      <SignupDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        setShowLogin={setShowLoginDialog}
        onSignupSuccess={() => {
          setIsLoggedIn(true);
          setShowSignupDialog(false);
        }}
      />

      {/* Login Button for HomePage */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to BarterHub</h1>
          <p className="text-lg text-gray-600">Sign in to start trading</p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Index;