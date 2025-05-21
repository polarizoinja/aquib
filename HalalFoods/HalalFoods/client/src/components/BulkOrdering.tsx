import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BulkOrdering = () => {
  return (
    <section className="py-12 bg-primary-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 font-heading">Bulk Orders for Restaurants</h2>
            <p className="mb-6">We offer special bulk pricing for restaurants. Our packages are designed to meet your specific needs with fresher products at better prices.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>5 kg Boneless Breast Pack - Save 5%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>10 kg Whole Chicken Crate - Save 8%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>5 kg Wings Pack - Save 5%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>2 kg Mince Pack - Save 3%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary mt-1 mr-2 h-5 w-5" />
                <span>20-piece Lollipop Pack - Save 7%</span>
              </li>
            </ul>
            <Button 
              asChild
              size="lg" 
              className="bg-secondary hover:bg-secondary-dark text-white"
            >
              <Link href="/contact">
                Request Bulk Quote
              </Link>
            </Button>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-12">
            <img 
              src="https://pixabay.com/get/g8320ba8b21622878970a963529a6772fc57e0672166531adb20e2a35063435bddbe755a5feb15ae952fd438e5d5bf4f9ed3243600d78de51e0ba657e6fcb17dd_1280.jpg" 
              alt="Bulk Ordering" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrdering;
