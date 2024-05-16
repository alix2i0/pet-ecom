import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    (<Card className="w-full max-w-2xl bg-white">
      <CardContent>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <img
              alt="Pet Product"
              className="w-full h-auto"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400" />
            <div className="flex justify-center space-x-2 mt-4">
              <img
                alt="Thumbnail"
                className="w-12 h-12"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50" />
              <img
                alt="Thumbnail"
                className="w-12 h-12"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50" />
              <img
                alt="Thumbnail"
                className="w-12 h-12"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50" />
              <img
                alt="Thumbnail"
                className="w-12 h-12"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50" />
              <img
                alt="Thumbnail"
                className="w-12 h-12"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50" />
            </div>
          </div>
          <div className="flex-1 mt-6 lg:mt-0 lg:ml-8">
            <h2 className="text-2xl font-bold">Pet Product Name</h2>
            <div className="mt-1 flex items-center">
              <Badge variant="secondary">In stock</Badge>
              <span className="ml-2 text-sm">Product code: PET-12345</span>
            </div>
            <p className="mt-4 text-gray-700">
              This is a placeholder description for the pet product. It should be replaced with real content describing
              the product features and benefits.
            </p>
            <hr className="my-6" />
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold">$299.99</span>
              <span className="text-sm line-through text-gray-500">$349.99</span>
            </div>
            <div className="mt-6">
              <Button>Add to Cart</Button>
              <Button className="ml-2" variant="ghost">
                <HeartIcon className="w-6 h-6" />
              </Button>
              <Button className="ml-2" variant="ghost">
                <ShareIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Built for Pets</h3>
          <p className="mt-2 text-gray-700">
            Our pet product is designed with your pet's needs in mind, offering comfort, safety, and fun all in one.
          </p>
        </div>
      </CardContent>
    </Card>)
  );
}

function HeartIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>)
  );
}


function ShareIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>)
  );
}
