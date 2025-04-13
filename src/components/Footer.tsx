
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-marcat-navy text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold">MARCAT</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Marcat offers premium men's clothing from multiple stores, each with unique collections and styles.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=shirts" className="text-gray-300 hover:text-white text-sm">Shirts</Link></li>
              <li><Link to="/products?category=pants" className="text-gray-300 hover:text-white text-sm">Pants</Link></li>
              <li><Link to="/products?category=footwear" className="text-gray-300 hover:text-white text-sm">Footwear</Link></li>
              <li><Link to="/products?category=outerwear" className="text-gray-300 hover:text-white text-sm">Outerwear</Link></li>
              <li><Link to="/products?category=activewear" className="text-gray-300 hover:text-white text-sm">Activewear</Link></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/stores" className="text-gray-300 hover:text-white text-sm">All Stores</Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-white text-sm">Special Offers</Link></li>
              <li><Link to="/commission" className="text-gray-300 hover:text-white text-sm">Commission Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">123 Fashion Street</li>
              <li className="text-gray-300 text-sm">Style City, SC 12345</li>
              <li className="text-gray-300 text-sm">Phone: (123) 456-7890</li>
              <li className="text-gray-300 text-sm">Email: info@marcat.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Marcat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
