import { ProductType } from '@/app/api/products/route';
import Image from 'next/image';

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div
      className="px-4 py-2 shadow-md rounded-xl flex flex-col sm:flex-row items-center"
      data-testid="product"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-52 sm:w-40 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            quality={100}
          />
        </div>
        <span className="font-bold text-center text-sm">{product.model}</span>
      </div>

      <div className="w-[80%] h-0.5 sm:w-0.5 sm:h-[80%] bg-gray-900 my-3 sm:my-0 sm:mr-4" />

      <div className="w-full my-4">
        <h1 className="font-bold mb-3 md:text-lg">{product.name}</h1>
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
          <ProductSpec label="Desenho" value={product.pattern.toLowerCase()} />
        </div>
      </div>
    </div>
  );
}

function ProductSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <span className="text-xs lg:text-sm text-gray-400">{label}</span>
      <span className="text-sm font-bold capitalize break-words">
        {value.toString()}
      </span>
    </div>
  );
}
