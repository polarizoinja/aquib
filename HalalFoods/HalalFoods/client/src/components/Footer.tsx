import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Award, 
  CheckCircle, 
  Shield, 
  Leaf 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-heading">AL-HALAL Foods</h3>
            <p className="mb-4 text-gray-400">Premium halal chicken and poultry products for restaurants and food service businesses.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-heading">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/category/fresh-chicken-cuts" className="text-gray-400 hover:text-white">
                  Fresh Chicken Cuts
                </Link>
              </li>
              <li>
                <Link href="/products/category/processed-chicken-products" className="text-gray-400 hover:text-white">
                  Processed Products
                </Link>
              </li>
              <li>
                <Link href="/products/category/marinated-ready-to-cook" className="text-gray-400 hover:text-white">
                  Marinated & Ready-to-Cook
                </Link>
              </li>
              <li>
                <Link href="/products/category/bulk-pack-options" className="text-gray-400 hover:text-white">
                  Bulk Pack Options
                </Link>
              </li>
              <li>
                <Link href="/products/category/value-added-services" className="text-gray-400 hover:text-white">
                  Value-Added Services
                </Link>
              </li>
              <li>
                <Link href="/products/category/eggs-add-ons" className="text-gray-400 hover:text-white">
                  Eggs & Add-ons
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/api/login" className="text-gray-400 hover:text-white">
                  Restaurant Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white">
                  Register Your Restaurant
                </Link>
              </li>
              <li>
                <Link href="/products/category/bulk-pack-options" className="text-gray-400 hover:text-white">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about#faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-xl mb-4 font-heading">Newsletter</h3>
            <p className="mb-4 text-gray-400">Subscribe to get updates on new products, special offers and other discount information.</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-white"
                />
                <button 
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-r-lg transition duration-300"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <div className="flex flex-wrap justify-center items-center space-x-6 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <Award className="text-primary mr-2 h-5 w-5" />
              <span className="text-gray-400">Halal Certified</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-primary mr-2 h-5 w-5" />
              <span className="text-gray-400">Quality Assured</span>
            </div>
            <div className="flex items-center">
              <Shield className="text-primary mr-2 h-5 w-5" />
              <span className="text-gray-400">Food Safety Compliant</span>
            </div>
            <div className="flex items-center">
              <Leaf className="text-primary mr-2 h-5 w-5" />
              <span className="text-gray-400">Ethically Sourced</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm pt-6 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} AL-HALAL Foods. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
