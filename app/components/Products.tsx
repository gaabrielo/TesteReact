import { FilterProvider } from '@/app/contexts/filter-context';
import { Header } from '@/app/components/Header';
import { ProductList } from '@/app/components/ProductList';

export default function Products() {
  return (
    <FilterProvider>
      <div className="w-full flex justify-center flex-col h-full">
        <Header />
        <div className="mb-4 border-b border-1"></div>
        <ProductList />
      </div>
    </FilterProvider>
  );
}
