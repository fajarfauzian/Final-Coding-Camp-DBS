
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Search, Filter, CheckCircle2, Truck, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const OrderTransactionPage = () => {
  const { toast } = useToast();
  const [complaint, setComplaint] = useState("");
  
  const handleSubmitComplaint = () => {
    if (complaint.trim()) {
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been recorded and will be processed soon.",
      });
      setComplaint("");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Order & Transaction Management</h1>
            <p className="text-muted-foreground">Manage orders and transactions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-medium">#12345</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">Credit Card</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">15 April 2025</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <p className="font-medium text-green-600">Paid</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Shipping</p>
              <p className="font-medium">DHL Express</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="font-medium">Budi Santoso</p>
            </div>
          </div>
        </div>

        {/* Detailed Order Status */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-4">Detailed Order Status</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Expected shipment date: 18 April 2025. Your order has been processed and is being prepared for shipment.
          </p>
          
          <div className="relative flex flex-col gap-2">
            {/* Progress Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 z-0"></div>
            
            {/* Order Steps */}
            <div className="relative z-10 flex items-center gap-3 bg-white">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Order Paid</p>
                <p className="text-sm text-muted-foreground">15 April 2025, 10:30 AM</p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 bg-white">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Order Processed</p>
                <p className="text-sm text-muted-foreground">16 April 2025, 09:15 AM</p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 bg-white">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Truck className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Shipping</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 bg-white">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Delivered</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between pb-2">
              <span>Subtotal</span>
              <span className="font-medium">Rp 535.000</span>
            </div>
            <div className="flex justify-between pb-2">
              <span>Tax (10%)</span>
              <span className="font-medium">Rp 53.500</span>
            </div>
            <div className="flex justify-between pb-2">
              <span>Shipping Cost</span>
              <span className="font-medium">Rp 25.000</span>
            </div>
            <Separator />
            <div className="flex justify-between pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">Rp 613.500</span>
            </div>
          </div>
        </div>

        {/* Customer Complaints */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-4">Customer Complaints</h2>
          <Textarea 
            placeholder="Enter your complaint or feedback here..." 
            className="min-h-32 mb-4"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />
          <Button onClick={handleSubmitComplaint} disabled={!complaint.trim()}>
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderTransactionPage;
