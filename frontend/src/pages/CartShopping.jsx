import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function CartShopping() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto pb-8 pt-28 px-4 md:px-0">
        <div>
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  Minimalist Desk Lamp
                </h3>
                <p className="text-gray-500 mb-4">$49.99</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                    <span>1</span>
                    <Button size="icon" variant="ghost">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost">
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  Ergonomic Office Chair
                </h3>
                <p className="text-gray-500 mb-4">$199.99</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                    <span>1</span>
                    <Button size="icon" variant="ghost">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost">
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  Wireless Charging Pad
                </h3>
                <p className="text-gray-500 mb-4">$29.99</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <MinusIcon className="w-5 h-5" />
                    </Button>
                    <span>1</span>
                    <Button size="icon" variant="ghost">
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost">
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <p>Subtotal</p>
            <p>$279.97</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p>Shipping</p>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between items-center mb-6 border-t pt-4">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">$279.97</p>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
