import { Award, Truck, Snowflake, Tags } from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-around items-center text-center">
          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <div className="text-primary text-3xl mb-2 flex justify-center">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Halal Certified</h3>
            <p className="text-sm text-gray-600">100% Authentic Certification</p>
          </div>
          
          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <div className="text-primary text-3xl mb-2 flex justify-center">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Same-day for local restaurants</p>
          </div>
          
          <div className="w-1/2 md:w-1/4 mb-4 md:mb-0">
            <div className="text-primary text-3xl mb-2 flex justify-center">
              <Snowflake className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Fresh Quality</h3>
            <p className="text-sm text-gray-600">Farm to restaurant freshness</p>
          </div>
          
          <div className="w-1/2 md:w-1/4">
            <div className="text-primary text-3xl mb-2 flex justify-center">
              <Tags className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Bulk Discounts</h3>
            <p className="text-sm text-gray-600">Special rates for restaurants</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
