import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRandom, FaShieldAlt, FaEthereum, FaTrophy, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      
      {/* Hero Section with animated background */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
        
      <Navbar/>
        <div className="container relative mx-auto px-4 pt-28 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 flex items-center justify-center">
              <div className="md:h-16 md:w-16 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <FaTrophy className="text-2xl md:text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                CryptoLottery
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white">Decentralized Lottery System</h2>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
              A transparent and fair lottery system powered by blockchain technology. 
              Try your luck and win big with complete transparency!
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link 
                to="/dashboard" 
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium text-base md:text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
              >
                Enter Lottery
              </Link>
              <Link 
                to="/dashboard" 
                className="px-10 py-4 border border-purple-500/30 rounded-lg font-medium text-base md:text-lg hover:bg-purple-500/10 transition-all transform hover:-translate-y-1"
              >
                Dashboard
              </Link>
            </motion.div>
            
            <a href="#features" className="animate-bounce absolute bottom-8 text-white/60 hover:text-white">
              <FaChevronDown className="text-2xl" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      {/* <div id="features" className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-blue-500/20 p-4 rounded-xl inline-block mb-6 group-hover:bg-blue-500/30 transition-all">
                <FaRandom className="text-4xl text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors">Provably Fair</h3>
              <p className="text-gray-300 leading-relaxed">Our lottery uses verifiable random functions on the blockchain to ensure complete fairness in winner selection.</p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-500/20 p-4 rounded-xl inline-block mb-6 group-hover:bg-purple-500/30 transition-all">
                <FaShieldAlt className="text-4xl text-purple-400 group-hover:text-purple-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">Secure & Transparent</h3>
              <p className="text-gray-300 leading-relaxed">All transactions and lottery operations are recorded on the blockchain for complete transparency.</p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-pink-500/20 p-4 rounded-xl inline-block mb-6 group-hover:bg-pink-500/30 transition-all">
                <FaEthereum className="text-4xl text-pink-400 group-hover:text-pink-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-pink-300 transition-colors">Instant Payouts</h3>
              <p className="text-gray-300 leading-relaxed">Winners receive their prizes automatically through smart contracts with no delays or intermediaries.</p>
            </motion.div>
          </div>
        </motion.div>
      </div> */}

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-pink-900/40 p-12 rounded-3xl backdrop-blur-sm border border-purple-500/20 shadow-2xl"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Ready to Try Your Luck?</h2>
          <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of players in our decentralized lottery system and experience the future of fair gaming.
          </p>
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/dashboard" 
                className="px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-medium text-base md:text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Enter Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-800/50 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
              <FaTrophy className="text-lg text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              CryptoLotto
            </span>
          </div>
          
          <p className="text-gray-400 mb-6 md:mb-0">© 2023 Decentralized Lottery. All rights reserved.</p>
          
          <div className="flex gap-8">
            <Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Dashboard</Link>
            <Link to="/how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</Link>
            <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
