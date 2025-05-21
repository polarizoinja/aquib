import { Scissors, Package, Tag, Snowflake } from "lucide-react";

const ValueAddedServices = () => {
  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Value-Added Services" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-12">
            <h2 className="text-3xl font-bold mb-4 font-heading text-gray-800">Value-Added Services</h2>
            <p className="text-gray-600 mb-6">We offer additional services to make your restaurant operations smoother and more efficient.</p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Custom Cutting</h3>
                  <p className="text-gray-600">Get your chicken cut exactly how you need it for your specific recipes - curry cut, biryani cut, or any custom specification.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Vacuum Packaging</h3>
                  <p className="text-gray-600">Extended shelf life and preserved freshness with our vacuum packaging option, ideal for bulk ordering.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <Tag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Labelled & Dated Packaging</h3>
                  <p className="text-gray-600">Easily manage your inventory with clearly labelled and dated packaging for all products.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-primary text-2xl">
                  <Snowflake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Cold Chain Delivery</h3>
                  <p className="text-gray-600">Temperature-controlled delivery ensures your products arrive fresh and safe, maintaining quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueAddedServices;
