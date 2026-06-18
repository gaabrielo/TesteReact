'use client';

import { ProductCard } from '@/app/components/ProductCard';
import { Spinner } from '@/app/components/Spinner';
import { useFilter } from '@/app/contexts/filter-context';

export function ProductList() {
  const { filteredProducts, isLoading } = useFilter();

  return isLoading ? (
    <Spinner />
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
  );
}
