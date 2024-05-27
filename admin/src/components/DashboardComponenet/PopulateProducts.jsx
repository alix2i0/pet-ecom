import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { mostPopularProduct } from '@/services/reducer/orderSlice';

function PopularProducts() {
  const dispatch = useDispatch();
  const popularProducts = useSelector((state) => state.orders.mostPopularProduct);

  useEffect(() => {
    dispatch(mostPopularProduct());
  }, [dispatch]);

  return (
    <div className="w-full bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">

        {popularProducts ? [popularProducts].map((product) => (
        <Link
            key={product._id} 
            to={`/product/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={"https://source.unsplash.com/100x100?earphone"}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.name}</p>
              <span
                className={classNames(
                  product.quantity === 0
                    ? 'text-red-500'
                    : product.quantity > 50
                    ? 'text-green-500'
                    : 'text-orange-500',
                  'text-xs font-medium'
                )}
              >
                {product.quantity === 0 ? 'Out of Stock' : product.quantity + ' in Stock'}
              </span>
            </div>
            <div className="text-xs text-gray-400 pl-1.5">{product.price}$</div>
          </Link>
        ))
      :<div>null</div>}

      </div>
    </div>
  );
}

export default PopularProducts;
