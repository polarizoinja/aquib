import { useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { OrderWithItems } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ShoppingBag, FileText, PackageCheck, Truck } from "lucide-react";

export default function OrderHistory() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Fetch orders
  const { 
    data: orders = [], 
    isLoading: ordersLoading,
  } = useQuery<OrderWithItems[]>({
    queryKey: ['/api/orders'],
    enabled: isAuthenticated,
  });

  // Fetch order details when an order is selected
  const { 
    data: orderDetails, 
    isLoading: detailsLoading 
  } = useQuery<OrderWithItems>({
    queryKey: ['/api/orders', selectedOrderId],
    enabled: isAuthenticated && selectedOrderId !== null,
  });

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500'; // For pending
    }
  };

  // Status badge display
  const renderStatusBadge = (status: string) => {
    return (
      <Badge className={`${getStatusColor(status)} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Render order status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <PackageCheck className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'cancelled':
        return <ShoppingBag className="h-5 w-5 text-red-500" />;
      default:
        return <ShoppingBag className="h-5 w-5 text-yellow-500" />; // For pending
    }
  };

  // Loading state
  if (authLoading || ordersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Order History | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="View your order history at AL-HALAL Foods. Login to see your past orders."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4 font-heading">Order History</h1>
          <p className="text-lg mb-8">Please log in to view your order history</p>
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <a href="/api/login">Log In</a>
          </Button>
        </div>
      </>
    );
  }

  // No orders state
  if (!orders || orders.length === 0) {
    return (
      <>
        <Helmet>
          <title>Order History | AL-HALAL Foods</title>
          <meta 
            name="description" 
            content="View your order history at AL-HALAL Foods. You haven't placed any orders yet."
          />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-4 font-heading">Order History</h1>
          <p className="text-lg mb-8">You haven't placed any orders yet</p>
          <Button asChild className="bg-primary hover:bg-primary-dark text-white">
            <a href="/products">Browse Products</a>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order History | AL-HALAL Foods</title>
        <meta 
          name="description" 
          content="View and track your orders from AL-HALAL Foods. Monitor delivery status and review past purchases."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 font-heading">Order History</h1>
        <p className="text-gray-600 mb-8">Track and manage your previous orders</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Orders List */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card 
                      key={order.id}
                      className={`cursor-pointer hover:border-primary transition-colors ${
                        selectedOrderId === order.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center mb-2">
                              {renderStatusIcon(order.status)}
                              <span className="ml-2 font-medium">Order #{order.id}</span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {formatDate(order.createdAt ? String(order.createdAt) : null)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="mb-1">{renderStatusBadge(order.status)}</div>
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  {selectedOrderId 
                    ? `Order #${selectedOrderId} details` 
                    : "Select an order to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedOrderId ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>Select an order from the list to view its details</p>
                  </div>
                ) : detailsLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ) : !orderDetails ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Order details could not be loaded</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date Placed</p>
                        <p>{orderDetails?.createdAt ? formatDate(String(orderDetails.createdAt)) : "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <div>{orderDetails?.status && renderStatusBadge(orderDetails.status)}</div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="font-bold">${orderDetails?.total ? orderDetails.total.toFixed(2) : '0.00'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                        <p>{orderDetails?.paymentMethod ? String(orderDetails.paymentMethod).replace(/_/g, ' ') : 'Not specified'}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <ScrollArea className="h-64">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Product</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {orderDetails.items && orderDetails.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="font-medium">{item.product?.name || 'Product'}</div>
                                  {item.selectedOptions && (
                                    <div className="text-xs text-gray-500">
                                      Options selected
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {item.quantity} {item.product?.unit || 'unit'}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>

                    <Separator />

                    {/* Shipping Details */}
                    <Accordion type="single" collapsible defaultValue="shipping">
                      <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping Information</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">Delivery Address:</p>
                            <p className="text-gray-600">{orderDetails.shippingAddress}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="billing">
                        <AccordionTrigger>Billing Information</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">Billing Address:</p>
                            <p className="text-gray-600">{orderDetails.billingAddress}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-end">
                <Button 
                  variant="outline" 
                  disabled={!selectedOrderId || detailsLoading}
                  onClick={() => window.print()}
                >
                  <FileText className="h-4 w-4 mr-2" /> Print Receipt
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
