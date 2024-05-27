import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold tracking-tight pt-8">Your Wishlist</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-semibold mb-2">Cozy Cat Bed</h2>
                <Button className="w-full text-white" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Chew-Proof Toy</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Automatic Feeder</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Grooming Kit</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Outdoor Leash</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Elevated Food Bowl</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">
                  Plush Scratching Post
                </h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                alt="Pet Product"
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
                <h2 className="text-lg font-medium mb-2">Calming Diffuser</h2>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
