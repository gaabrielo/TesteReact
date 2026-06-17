'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/app/components/ProductCard';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { ProductType } from '@/app/api/products/route';
import { Spinner } from '@/app/components/Spinner';

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full flex justify-center flex-col h-full">
      <div className="border-gray-500 w-1/2 mx-auto mb-4">
        <label
          htmlFor="search"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Pesquisa
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      </div>

      <div className="mb-4 border-b border-1"></div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          data-testid="products"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
