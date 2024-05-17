
import {Link} from "react-router-dom"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function Component() {
  return (
    <>
      <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <PawPrintIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Paw Emporium</span>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <Link className="hover:text-gray-300" href="#">
            Home
          </Link>
          <Link className="hover:text-gray-300" href="#">
            Shop
          </Link>
          <Link className="hover:text-gray-300" href="#">
            Categories
          </Link>
          <Link className="hover:text-gray-300" href="#">
            About
          </Link>
          <Link className="hover:text-gray-300" href="#">
            Contact
          </Link>
        </nav>
        <div className="relative w-full max-w-md md:w-auto">
          <Input
            className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none"
            placeholder="Search products..."
            type="search"
          />
          <SearchIcon className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </header>
      <main className="container mx-auto py-8">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Deluxe Dog Bed</h3>
                <p className="mb-4 text-gray-500">Cozy and comfortable dog bed with orthopedic support.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$49.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Premium Cat Scratching Post</h3>
                <p className="mb-4 text-gray-500">Durable scratching post with sisal-wrapped posts.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$29.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Automatic Pet Feeder</h3>
                <p className="mb-4 text-gray-500">Programmable pet feeder with portion control.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$59.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Plush Dog Toy</h3>
                <p className="mb-4 text-gray-500">Soft and durable plush toy for dogs.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$14.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <DogIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dogs</span>
            </Link>
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <CatIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Cats</span>
            </Link>
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <BirdIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Birds</span>
            </Link>
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <FishIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Fish</span>
            </Link>
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <RabbitIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Rabbits</span>
            </Link>
            <Link className="group flex flex-col items-center" href="#">
              <div className="mb-2 h-16 w-16 rounded-full bg-gray-200 transition-colors group-hover:bg-gray-300">
                <HamIcon className="mx-auto mt-4 h-8 w-8 text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Hamsters</span>
            </Link>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">All Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Elevated Dog Bowl</h3>
                <p className="mb-4 text-gray-500">Raised dog bowl set with stainless steel bowls.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$24.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Automatic Cat Litter Box</h3>
                <p className="mb-4 text-gray-500">Self-cleaning litter box with odor control.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$99.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Durable Dog Leash</h3>
                <p className="mb-4 text-gray-500">Heavy-duty leash with reinforced nylon strap.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$14.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Soft Cat Carrier</h3>
                <p className="mb-4 text-gray-500">Comfortable and portable cat carrier.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$39.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Chew-Resistant Dog Toy</h3>
                <p className="mb-4 text-gray-500">Durable rubber toy for heavy chewers.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$12.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Catnip-Filled Toy</h3>
                <p className="mb-4 text-gray-500">Plush toy filled with premium catnip.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$8.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Adjustable Dog Harness</h3>
                <p className="mb-4 text-gray-500">Comfortable and secure dog harness.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$19.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-white shadow-md">
              <img
                alt="Product Image"
                className="h-48 w-full rounded-t-md object-cover"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">Automatic Fish Feeder</h3>
                <p className="mb-4 text-gray-500">Programmable fish feeder for aquariums.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">$29.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 py-6 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <PawPrintIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Paw Emporium</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link className="hover:text-gray-300" href="#">
              Home
            </Link>
            <Link className="hover:text-gray-300" href="#">
              Shop
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}

function BirdIcon(props) {
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
      <path d="M16 7h.01" />
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
      <path d="m20 7 2 .5-2 .5" />
      <path d="M10 18v3" />
      <path d="M14 17.75V21" />
      <path d="M7 18a6 6 0 0 0 3.84-10.61" />
    </svg>
  )
}


function CatIcon(props) {
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
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </svg>
  )
}


function DogIcon(props) {
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
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  )
}


function FishIcon(props) {
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
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </svg>
  )
}


function HamIcon(props) {
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
      <path d="M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" />
      <path d="M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288" />
      <path d="M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025" />
      <path d="m8.5 16.5-1-1" />
    </svg>
  )
}


function PawPrintIcon(props) {
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
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  )
}


function RabbitIcon(props) {
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
      <path d="M13 16a3 3 0 0 1 2.24 5" />
      <path d="M18 12h.01" />
      <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
      <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
      <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}