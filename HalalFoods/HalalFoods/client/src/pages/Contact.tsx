import { Helmet } from "react-helmet";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="Get in touch with AL-HALAL Foods for all your halal chicken and poultry product needs. Contact our sales team for pricing, bulk orders, or inquiries."
        />
        <meta property="og:title" content="Contact Us | AL-HALAL Foods" />
        <meta property="og:description" content="Get in touch with AL-HALAL Foods for all your halal chicken and poultry product needs." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="py-8 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-heading">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for sales inquiries, bulk orders, or any questions you may have about our halal chicken products.
            </p>
          </div>
        </div>
      </div>
      
      <ContactForm />

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">Visit Our Facility</h2>
            <p className="text-gray-600">
              We welcome restaurant owners to visit our processing facility and see our commitment to quality and halal standards firsthand.
            </p>
          </div>
          
          <div className="bg-neutral h-96 rounded-lg flex items-center justify-center">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-2">Google Maps Integration</h3>
              <p className="text-gray-600">
                Our facility is located at 123 Business District, City Center, State, ZIP Code.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
