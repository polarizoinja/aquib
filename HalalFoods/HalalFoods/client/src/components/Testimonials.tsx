import { Star, StarHalf } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Khan",
      company: "Spice Garden Restaurant",
      rating: 5,
      text: "AL-HALAL Foods has been our trusted supplier for over 3 years. Their quality is consistent, delivery is always on time, and their marinated chicken products save us valuable prep time."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Olive Bistro",
      rating: 4.5,
      text: "The bulk ordering option has saved us a significant amount on our food costs. Their chicken is always fresh and the halal certification gives our customers confidence in our food."
    },
    {
      id: 3,
      name: "Mohammed Ali",
      company: "Royal Feast Restaurant",
      rating: 5,
      text: "The custom cutting service has been a game-changer for our kitchen efficiency. Their online ordering system makes weekly ordering simple, and the product quality is excellent."
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-400 fill-current h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-yellow-400 fill-current h-4 w-4" />);
    }

    return stars;
  };

  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2 font-heading">What Our Customers Say</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">Hear from the restaurants that trust us for their halal chicken supply</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-gray-600">{testimonial.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
