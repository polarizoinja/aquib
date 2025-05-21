import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderHistory from "@/pages/OrderHistory";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Register from "@/pages/Register";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/products/category/:slug" component={Products} />
          <Route path="/products/:slug" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout">
            {isAuthenticated ? <Checkout /> : <Register />}
          </Route>
          <Route path="/orders">
            {isAuthenticated ? <OrderHistory /> : <Register />}
          </Route>
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
