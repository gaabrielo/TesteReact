'use client';

import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '@/app/components/ProductCard';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { ProductType } from '@/app/api/products/route';
import { Spinner } from '@/app/components/Spinner';

// Normaliza a string removendo acentos
function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Array de strings
function tokenize(str: string) {
  return normalize(str).split(/\s+/).filter(Boolean);
}

// Compara os tokens da busca com os tokens do produto e retorna se eles correspondem
function matchesTokens(tokens: string[], ...fields: string[]) {
  const haystack = fields.map(normalize).join(' ');
  return tokens.every((token) => haystack.includes(token));
}

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (error) {
        if (error) {
          console.error('Failed to fetch products: ', error);
          setError('Não foi possível carregar os produtos. Tente novamente.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const productTokens = tokenize(searchTerm);

    return products.filter((product) => {
      const matchesProduct =
        productTokens.length === 0 ||
        matchesTokens(
          productTokens,
          product.name,
          product.model,
          ...product.cars,
        );

      return matchesProduct;
    });
  }, [products, searchTerm]);

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
            value={searchTerm}
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
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado</p>
      ) : (
        <div
          data-testid="products"
          className="grid grid-cols-1 xl:grid-cols-2 gap-4"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
