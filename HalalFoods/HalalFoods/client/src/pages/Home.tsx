import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryTabs from "@/components/CategoryTabs";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import ValueAddedServices from "@/components/ValueAddedServices";
import Testimonials from "@/components/Testimonials";
import BulkOrdering from "@/components/BulkOrdering";
import ContactForm from "@/components/ContactForm";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: "fresh-chicken-cuts" }],
  });

  // Render skeleton loaders during loading
  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="p-4">
          <Skeleton className="w-3/4 h-6 mb-2" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-1/3 h-4 mb-3" />
          <div className="flex items-center">
            <Skeleton className="w-14 h-8 mr-3" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Helmet>
        <title>AL-HALAL Foods - Premium Halal Chicken for Restaurants</title>
        <meta 
          name="description" 
          content="High-quality, certified halal poultry products delivered fresh to your restaurant. AL-HALAL Foods offers a wide range of chicken and poultry products for food service businesses."
        />
        <meta property="og:title" content="AL-HALAL Foods - Premium Halal Chicken for Restaurants" />
        <meta property="og:description" content="High-quality, certified halal poultry products delivered fresh to your restaurant." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <TrustBadges />
      
      <section id="products" className="py-12 bg-neutral">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-heading">Our Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of halal chicken and poultry products specially curated for restaurant needs.</p>
          </div>

          <CategoryTabs />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {isLoading ? (
              renderSkeletons()
            ) : (
              products?.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <button className="bg-white hover:bg-gray-100 text-primary border border-primary py-2 px-6 rounded-lg font-medium transition duration-300">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      <BulkOrdering />
      <FeaturedProducts />
      <WhyChooseUs />
      <ValueAddedServices />
      <Testimonials />
      <ContactForm />
    </>
  );
}
