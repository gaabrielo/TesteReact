import { ProductType } from '@/app/api/products/route';
import Image from 'next/image';

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      className="px-4 py-2 shadow-md rounded-xl flex items-center"
      data-testid="product"
    >
      <div className="text-center">
        <div className="relative w-20 md:w-40 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            quality={100}
          />
        </div>
        <span className="font-bold">{product.model}</span>
      </div>

      <div className="w-0.5 h-[80%] bg-gray-900"></div>

      <div className="ml-4 w-full">
        <h1 className="font-bold mb-4">{product.name}</h1>
        <div className="grid grid-cols-3 gap-3">
          <ProductSpec
            label="Durabilidade"
            value={product.treadwear.toString()}
          />
          <ProductSpec label="Tração" value={product.traction} />
          <ProductSpec label="Temperatura" value={product.temperature} />
          <ProductSpec
            label="Índice de velocidade"
            value={product.speedRating}
          />
          <ProductSpec label="Capacidade de carga" value={product.loadIndex} />
          <ProductSpec label="Desenho" value={product.pattern} />
        </div>
      </div>
    </div>
  );
}

function ProductSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="font-bold capitalize break-words">{value}</span>
    </div>
  );
}
