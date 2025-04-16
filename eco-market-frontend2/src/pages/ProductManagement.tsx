
import React from "react";
import { Layout } from "@/components/Layout";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const products = [
  {
    id: 1,
    name: "Herbala Book",
    image: "/placeholder.svg",
    category: "Stationery",
    price: 150000,
  },
  {
    id: 2,
    name: "Coffee Straw",
    image: "/placeholder.svg",
    category: "Kitchen",
    price: 35000,
  },
  {
    id: 3,
    name: "Fruit Preserver",
    image: "/placeholder.svg",
    category: "Kitchen",
    price: 89000,
  },
  {
    id: 4,
    name: "Bamboo Cup",
    image: "/placeholder.svg",
    category: "Kitchen",
    price: 45000,
  },
  {
    id: 5,
    name: "Hemp Bag",
    image: "/placeholder.svg",
    category: "Accessories",
    price: 120000,
  },
  {
    id: 6,
    name: "Ceramic Vase",
    image: "/placeholder.svg",
    category: "Home Decor",
    price: 250000,
  },
  {
    id: 7,
    name: "Recycled Paper Bag",
    image: "/placeholder.svg",
    category: "Packaging",
    price: 15000,
  },
  {
    id: 8,
    name: "Wooden Spoon Set",
    image: "/placeholder.svg",
    category: "Kitchen",
    price: 75000,
  },
];

const ProductManagementPage = () => {
  return (
    <Layout>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Product Management</h1>
            <p className="text-muted-foreground">Product Grid View</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 card-shadow hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {product.category}
                  </span>
                </div>
                <p className="font-semibold">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <div className="pt-2 flex justify-between">
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-6">
          <div className="text-sm text-muted-foreground">
            <p>Total Products: {products.length}</p>
            <p>Environmental Score: 80%</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" disabled>
              Previous
            </Button>
            <Button size="sm" variant="outline" className="bg-secondary">
              1
            </Button>
            <Button size="sm" variant="outline">
              2
            </Button>
            <Button size="sm" variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductManagementPage;
