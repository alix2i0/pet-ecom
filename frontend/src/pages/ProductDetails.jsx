import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fetchProductById } from "../../../admin/src/services/reducer/productSlice";
import { HeartIcon, ShareIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetails);
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById({ productId: id }));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pt-16 z-30 flex items-center justify-center bg-gray-50 bg-opacity-75"
      >
        <Card className="w-full max-w-4xl h-min bg-white p-4">
          <CardContent>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row"
            >
              <div className="flex-1">
                <img
                  alt={product.name}
                  className="w-full h-auto"
                  height="400"
                  src={product.image || "/placeholder.svg"}
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width="400"
                />
                <div className="flex justify-center space-x-2 mt-4">
                  {product.thumbnails && product.thumbnails.length > 0 ? (
                    product.thumbnails.map((thumbnail, index) => (
                      <motion.img
                        key={index}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-12 h-12"
                        height="50"
                        src={thumbnail || "/placeholder.svg"}
                        style={{
                          aspectRatio: "50/50",
                          objectFit: "cover",
                        }}
                        width="50"
                        whileHover={{ scale: 1.1 }}
                      />
                    ))
                  ) : (
                    <p>No thumbnails available</p>
                  )}
                </div>
              </div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 mt-6 lg:mt-0 lg:ml-8"
              >
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="mt-1 flex items-center">
                  <Badge variant="secondary">
                    {product.stockStatus || "In Stock"}
                  </Badge>
                  <span className="ml-2 text-sm">
                    Product code: {product.code || "N/A"}
                  </span>
                </div>
                <p className="mt-4 text-gray-700">{product.description}</p>
                <hr className="my-6" />
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-semibold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${product.originalPrice}
                    </span>
                  )}
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
              </motion.div>
            </motion.div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Built for Pets</h3>
              <p className="mt-2 text-gray-700">
                {product.additionalInfo ||
                  "Our pet product is designed with your pet's needs in mind, offering comfort, safety, and fun all in one."}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
