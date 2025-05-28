"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ArrowRight, Gem, Handshake, RefreshCw, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListingCard from "@/components/listing-card";
import { FilterDialog } from "@/components/filter-dialog";
import { Navbar } from "@/components/navbar";
import type { FilterOptions } from "@/lib/types";
import { useListings } from "@/context/listings-context";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MainPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { listings } = useListings();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    condition: "any",
    exchangeMethod: "any",
    maxDistance: 50,
    sortBy: "recent",
  });
  const [filteredListings, setFilteredListings] = useState(listings);
  const [isScrolled, setIsScrolled] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Apply filters and search
  useEffect(() => {
    let results = [...listings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.category.toLowerCase().includes(query) ||
          listing.lookingFor.toLowerCase().includes(query)
      );
    }

    if (filterOptions.categories.length > 0) {
      results = results.filter((listing) => filterOptions.categories.includes(listing.category));
    }

    if (filterOptions.condition !== "any") {
      results = results.filter((listing) => listing.condition === filterOptions.condition);
    }

    if (filterOptions.exchangeMethod !== "any") {
      results = results.filter(
        (listing) =>
          listing.exchangeMethod === filterOptions.exchangeMethod ||
          (filterOptions.exchangeMethod === "both" && listing.exchangeMethod === "Both options")
      );
    }

    if (filterOptions.sortBy === "recent") {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filterOptions.sortBy === "oldest") {
      results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredListings(results);
  }, [searchQuery, filterOptions, listings]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
  };

  const resetFilters = () => {
    setFilterOptions({
      categories: [],
      condition: "any",
      exchangeMethod: "any",
      maxDistance: 50,
      sortBy: "recent",
    });
    setSearchQuery("");
  };

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterOptions, listings]);

  // Authentication check with proper error handling
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home page instead of direct signin
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600" />
      </div>
    );
  }

  // Protected content - ensure user is authenticated
  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar 
        scrolled={isScrolled}
        user={session.user} // Pass user data to Navbar
      />

      <main className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <motion.section
          className="mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 md:p-12 lg:p-16 text-white shadow-xl">
            {/* Welcome message with user's name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 flex items-center gap-2"
            >
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                Welcome, {session.user.name}
              </span>
              <span className="text-sm opacity-90">Join thousands of happy traders</span>
            </motion.div>

            <div className="relative z-10 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2 flex items-center gap-2"
              >
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  New & Improved
                </span>
                <span className="text-sm opacity-90">Join thousands of happy traders</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Trade What You Have, <br className="hidden md:block" /> Get What You Need
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                The modern way to barter goods and services without cash. Find perfect matches in your community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row gap-4 max-w-2xl"
              >
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                  <Input
                    placeholder="Search for items, services, or categories..."
                    className="pl-10 py-6 rounded-xl bg-white/15 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 focus:border-white/50"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <FilterDialog
                  filterOptions={filterOptions}
                  onFilterChange={handleFilterChange}
                  onReset={resetFilters}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center gap-4 text-sm"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30"></div>
                  ))}
                </div>
                <span className="opacity-80">500+ trades completed this week</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Listings Section */}
        <section className="mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {filteredListings.length > 0
                  ? `Available Listings (${filteredListings.length})`
                  : "No Listings Found"}
              </h2>

              {(filterOptions.categories.length > 0 ||
                filterOptions.condition !== "any" ||
                filterOptions.exchangeMethod !== "any" ||
                searchQuery) && (
                <motion.div
                  className="flex items-center mt-3 flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchQuery && (
                    <motion.span
                      className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-3 py-1.5 flex items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-1.5 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        &times;
                      </button>
                    </motion.span>
                  )}
                  {filterOptions.categories.map((category) => (
                    <motion.span
                      key={category}
                      className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-3 py-1.5 flex items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {category}
                      <button
                        onClick={() =>
                          setFilterOptions({
                            ...filterOptions,
                            categories: filterOptions.categories.filter((c) => c !== category),
                          })
                        }
                        className="ml-1.5 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        &times;
                      </button>
                    </motion.span>
                  ))}
                  {filterOptions.condition !== "any" && (
                    <motion.span
                      className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-3 py-1.5 flex items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {filterOptions.condition}
                      <button
                        onClick={() =>
                          setFilterOptions({
                            ...filterOptions,
                            condition: "any",
                          })
                        }
                        className="ml-1.5 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        &times;
                      </button>
                    </motion.span>
                  )}
                  {filterOptions.exchangeMethod !== "any" && (
                    <motion.span
                      className="text-xs bg-indigo-100 text-indigo-800 rounded-full px-3 py-1.5 flex items-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    >
                      {filterOptions.exchangeMethod === "in-person"
                        ? "In-person only"
                        : filterOptions.exchangeMethod === "shipping"
                        ? "Shipping only"
                        : "Both options"}
                      <button
                        onClick={() =>
                          setFilterOptions({
                            ...filterOptions,
                            exchangeMethod: "any",
                          })
                        }
                        className="ml-1.5 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        &times;
                      </button>
                    </motion.span>
                  )}
                  <motion.button
                    onClick={resetFilters}
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <RefreshCw className="w-3 h-3" />
                    Clear all
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {paginatedListings.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
                layout
              >
                {paginatedListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    variants={item}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    layout
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring" }}
              >
                <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">No matching listings found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Try adjusting your search criteria or browse our popular categories
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={resetFilters}
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg shadow-lg shadow-indigo-100 gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset All Filters
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full  blacktext-gray-600 hover:text-purple-600"
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition font-semibold mx-[2px]
                      ${currentPage === i + 1
                        ? "bg-purple-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700 shadow"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <Button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <motion.section
          className="mt-24 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 mb-4"
            >
              <Handshake className="w-4 h-4" />
              <span className="text-sm font-medium">How it works</span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Trade With Confidence
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our simple process ensures safe and satisfying trades for everyone
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gem className="w-6 h-6 text-indigo-600" />,
                title: "List Your Item",
                description:
                  "Create a listing with photos and details in minutes. Be specific about what you're looking for in return.",
                color: "bg-indigo-50",
              },
              {
                icon: <Search className="w-6 h-6 text-indigo-600" />,
                title: "Discover Matches",
                description:
                  "Our smart matching system suggests relevant trades. Browse or get personalized recommendations.",
                color: "bg-purple-50",
              },
              {
                icon: <Handshake className="w-6 h-6 text-indigo-600" />,
                title: "Secure Exchange",
                description:
                  "Chat safely, agree on terms, and arrange the trade. We provide guidance for smooth transactions.",
                color: "bg-blue-50",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className={cn(
                  "bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all",
                  "relative overflow-hidden group h-full flex flex-col"
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${step.color}`}></div>
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{step.description}</p>
                  <motion.div
                    className="text-indigo-600 flex items-center gap-2 font-medium mt-auto"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="mb-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 p-10 md:p-16 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Start Trading?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of happy traders swapping items they don't need for things they love.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/create-listing">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg"
                >
                  Create Your First Listing
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold"
              >
                How It Works
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}