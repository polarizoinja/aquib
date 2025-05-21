import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative">
      <div 
        className="h-96 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://pixabay.com/get/geb4ae53284bfd5c8e540b77e8ec0c18be1c59454c4481ca08ad768b405e850ae7ae09646d11598cf81e5ce01a63cb9fa24b844a8f393137eda13b3c492b0cb6d_1280.jpg')" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
          <div className="w-full md:w-1/2">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
              Premium Halal Chicken For Restaurants
            </h1>
            <p className="text-white text-lg mb-6">
              High-quality, certified halal poultry products delivered fresh to your restaurant.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary-dark text-white"
              >
                <Link href="/products">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Products
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-white hover:bg-gray-100 text-primary border-white"
              >
                <Link href="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
