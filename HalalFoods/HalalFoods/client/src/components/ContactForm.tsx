import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const contactFormSchema = z.object({
  restaurantName: z.string().min(2, "Restaurant name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(6, "Phone number is required"),
  message: z.string().min(10, "Message is too short").max(500, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      restaurantName: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-neutral">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 font-heading text-gray-800">Contact Our Sales Team</h2>
              <p className="text-gray-600 mb-8">Get in touch with our dedicated restaurant sales team for pricing, bulk orders, or any questions you may have.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="restaurantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your restaurant name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your requirements" 
                            className="resize-none h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6 font-heading">Quick Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Location</h4>
                    <p>123 Business District, City Center<br />State, ZIP Code</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p>+123-456-7890 (Sales)<br />+123-456-7891 (Support)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p>sales@al-halalfoods.com<br />support@al-halalfoods.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-secondary text-xl">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Business Hours</h4>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Us:</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-secondary">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white hover:text-secondary">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white hover:text-secondary">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white hover:text-secondary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
