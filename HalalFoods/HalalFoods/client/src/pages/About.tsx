import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Award, CheckCircle, Shield, Leaf } from "lucide-react";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="Learn about AL-HALAL Foods and our commitment to providing premium quality halal chicken and poultry products to restaurants and food service businesses."
        />
        <meta property="og:title" content="About Us | AL-HALAL Foods" />
        <meta property="og:description" content="Learn about AL-HALAL Foods and our commitment to providing premium halal chicken products." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-72 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80')" 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
            <div className="w-full text-center">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
                About AL-HALAL Foods
              </h1>
              <p className="text-white text-lg max-w-2xl mx-auto">
                Committed to delivering premium quality halal chicken products to restaurants since 2010
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-heading">Our Story</h2>
              <div className="space-y-4">
                <p>
                  AL-HALAL Foods was founded in 2010 with a simple mission: to provide restaurants with the highest quality halal chicken and poultry products while maintaining strict adherence to Islamic dietary laws and food safety standards.
                </p>
                <p>
                  What began as a small family business has grown into a trusted supplier for hundreds of restaurants across the region. Our commitment to quality, authenticity, and customer service has been the cornerstone of our growth and success.
                </p>
                <p>
                  Today, we continue to uphold the same values that guided us from the start. We work directly with certified halal farms to ensure that every product we offer meets our rigorous standards for quality, freshness, and halal compliance.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="AL-HALAL Foods Facility" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center font-heading">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                We never compromise on the quality of our products. From sourcing to delivery, we maintain the highest standards at every step.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <CheckCircle className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Authenticity</h3>
              <p className="text-gray-600 text-center">
                Our halal certification is authenticated by recognized Islamic authorities, ensuring that all our products comply with Islamic dietary laws.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Food Safety</h3>
              <p className="text-gray-600 text-center">
                We adhere to strict food safety protocols and maintain HACCP certification across our processing facilities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <Leaf className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Sustainability</h3>
              <p className="text-gray-600 text-center">
                We work with farms that employ sustainable and ethical farming practices, ensuring the welfare of animals and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-heading">Our Halal Certification</h2>
              <div className="space-y-4">
                <p>
                  At AL-HALAL Foods, our halal certification is more than just a label — it's our commitment to our customers and a reflection of our core values.
                </p>
                <p>
                  All our products are certified by recognized Islamic authorities who conduct regular inspections of our facilities and processing methods. This ensures that every step of our operation adheres to the strict guidelines of halal food production.
                </p>
                <p>
                  Our certification process includes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Regular inspection of our facilities by certified halal inspectors</li>
                  <li>Strict adherence to Islamic slaughtering methods</li>
                  <li>Complete segregation from non-halal products</li>
                  <li>Documentation and traceability throughout the supply chain</li>
                </ul>
                <p>
                  We are proud to maintain these high standards and are happy to provide certification documentation to our customers upon request.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://pixabay.com/get/g031bfb398738079b6eae52adc2a1b2c2661d18713964391d0a101acaf96c78150a0e012ee33811a6e60e9009f0caad7e08f8e22bb2d3393f98bca3a675e740d6_1280.jpg" 
                alt="Halal Certification" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center font-heading">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>What makes your chicken halal certified?</AccordionTrigger>
                <AccordionContent>
                  Our chicken is halal certified according to Islamic dietary laws. This means that the animals are raised in humane conditions, slaughtered by a Muslim with a prayer (tasmiya), and the blood is fully drained from the animal. Our entire process is regularly inspected and certified by recognized Islamic authorities.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q2">
                <AccordionTrigger>Do you offer bulk discounts for restaurants?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer special bulk pricing for restaurants. The discount varies depending on the volume and frequency of your orders. For larger orders, we recommend contacting our sales team directly to discuss customized pricing packages tailored to your restaurant's needs.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q3">
                <AccordionTrigger>What delivery options are available?</AccordionTrigger>
                <AccordionContent>
                  We offer next-day delivery for orders placed before 3 PM, and same-day delivery for orders placed before 10 AM (subject to your location). All deliveries are made using temperature-controlled vehicles to ensure product freshness and safety. We also offer flexible delivery schedules for our regular customers.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q4">
                <AccordionTrigger>What is your minimum order quantity?</AccordionTrigger>
                <AccordionContent>
                  Minimum order quantities vary by product. For most items, we have established minimum order quantities that are clearly indicated on the product page. For restaurants with specific requirements, we can work with you to accommodate your needs. Please contact our sales team for more information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q5">
                <AccordionTrigger>Do you offer custom cutting services?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer custom cutting services to meet your restaurant's specific requirements. Whether you need special curry cuts, biryani cuts, or any other specific preparation, our team can accommodate your needs. This service is available for most of our chicken products at a small additional charge.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q6">
                <AccordionTrigger>How do I place a bulk order?</AccordionTrigger>
                <AccordionContent>
                  You can place bulk orders directly through our website by selecting the desired quantities. For very large orders or regular standing orders, we recommend contacting our sales team through the Contact page or by phone to set up a customized ordering schedule with special pricing considerations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
