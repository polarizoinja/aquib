import { Award, Leaf, Utensils, Truck } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 font-heading">Why Choose AL-HALAL Foods</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We are committed to providing the highest quality halal chicken products to restaurants.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Reason 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <Award className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Certified Halal</h3>
            <p className="text-gray-600">All our products are 100% certified halal, ensuring compliance with Islamic dietary laws.</p>
          </div>

          {/* Reason 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quality & Freshness</h3>
            <p className="text-gray-600">We source from trusted farms with strict quality control for the freshest poultry.</p>
          </div>

          {/* Reason 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <Utensils className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Restaurant Focused</h3>
            <p className="text-gray-600">Products and packaging designed specifically for commercial kitchen needs.</p>
          </div>

          {/* Reason 4 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <Truck className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Reliable Delivery</h3>
            <p className="text-gray-600">Temperature-controlled logistics to ensure products arrive in perfect condition.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
