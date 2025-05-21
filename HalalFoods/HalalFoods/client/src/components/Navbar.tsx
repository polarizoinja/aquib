import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CartItemWithProduct } from "@/lib/types";
import SearchBar from "@/components/SearchBar";
import { Menu, ShoppingCart, User, Building, Phone, Mail, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch cart items
  const { data: cartItems } = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
    enabled: isAuthenticated,
  });

  const cartItemCount = cartItems?.length || 0;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-2 md:mb-0">
            <span className="mr-4 flex items-center md:inline-flex">
              <Phone className="h-4 w-4 mr-2" /> +123-456-7890
            </span>
            <span className="flex items-center md:inline-flex">
              <Mail className="h-4 w-4 mr-2" /> info@al-halalfoods.com
            </span>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/orders" className="text-sm hover:text-secondary-light mr-4 inline-flex items-center">
                <User className="h-4 w-4 mr-1" /> My Orders
              </Link>
            ) : (
              <Link href="/api/login" className="text-sm hover:text-secondary-light mr-4 inline-flex items-center">
                <User className="h-4 w-4 mr-1" /> Restaurant Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link href="/register" className="text-sm hover:text-secondary-light inline-flex items-center">
                <Building className="h-4 w-4 mr-1" /> Register Your Restaurant
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/api/logout" className="text-sm hover:text-secondary-light inline-flex items-center">
                <X className="h-4 w-4 mr-1" /> Logout
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-bold text-primary mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div>
              <span className="font-heading font-bold text-2xl text-primary">AL-HALAL</span>
              <span className="block text-sm text-gray-600">Restaurant Supply</span>
            </div>
          </Link>
        </div>
        
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <SearchBar />
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-6">
            <Link href="/cart" className="text-gray-700 hover:text-primary">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
          <Button asChild variant="default" className="bg-primary hover:bg-primary-dark text-white">
            <Link href="/products">
              <ShoppingCart className="h-4 w-4 mr-2" /> Quick Order
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Navigation - Desktop */}
      <nav className="bg-neutral-dark py-3 hidden md:block">
        <div className="container mx-auto px-4 md:px-6">
          <ul className="flex flex-wrap justify-center text-white">
            <li className="mx-3 my-1">
              <Link href="/" className={`hover:text-secondary-light text-sm md:text-base font-medium ${location === '/' ? 'text-secondary-light' : ''}`}>
                Home
              </Link>
            </li>
            <li className="mx-3 my-1">
              <Link href="/about" className={`hover:text-secondary-light text-sm md:text-base font-medium ${location === '/about' ? 'text-secondary-light' : ''}`}>
                About Us
              </Link>
            </li>
            <li className="mx-3 my-1">
              <Link href="/products" className={`hover:text-secondary-light text-sm md:text-base font-medium ${location.includes('/products') ? 'text-secondary-light' : ''}`}>
                Products
              </Link>
            </li>
            <li className="mx-3 my-1">
              <Link href="/products/category/bulk-pack-options" className={`hover:text-secondary-light text-sm md:text-base font-medium ${location.includes('/bulk-pack-options') ? 'text-secondary-light' : ''}`}>
                Bulk Orders
              </Link>
            </li>
            <li className="mx-3 my-1">
              <Link href="/about#certification" className={`hover:text-secondary-light text-sm md:text-base font-medium`}>
                Certification
              </Link>
            </li>
            <li className="mx-3 my-1">
              <Link href="/contact" className={`hover:text-secondary-light text-sm md:text-base font-medium ${location === '/contact' ? 'text-secondary-light' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-10 w-10 p-0 flex items-center justify-center md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="px-2 py-1 hover:text-primary">Home</Link>
              <Link href="/about" className="px-2 py-1 hover:text-primary">About Us</Link>
              <Link href="/products" className="px-2 py-1 hover:text-primary">Products</Link>
              <Link href="/products/category/bulk-pack-options" className="px-2 py-1 hover:text-primary">Bulk Orders</Link>
              <Link href="/about#certification" className="px-2 py-1 hover:text-primary">Certification</Link>
              <Link href="/contact" className="px-2 py-1 hover:text-primary">Contact</Link>
              {isAuthenticated ? (
                <Link href="/orders" className="px-2 py-1 hover:text-primary">My Orders</Link>
              ) : null}
              {isAuthenticated ? (
                <Link href="/api/logout" className="px-2 py-1 hover:text-primary">Logout</Link>
              ) : (
                <Link href="/api/login" className="px-2 py-1 hover:text-primary">Login</Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
