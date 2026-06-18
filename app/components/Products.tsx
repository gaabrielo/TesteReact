import { FilterProvider } from '@/app/contexts/filter-context';
import { Header } from '@/app/components/Header';
import { ProductList } from '@/app/components/ProductList';

export default function Products() {
  /*
    Optei por utilizar contexto para armazenar os parametros do filtro e os resultados da busca
    permitindo que o filtro seja compartilhado entre os componentes da aplicação

    Geralmente eu coloco o provider dentro do componente mais alto da hierarquia, 
    como o layout, mas neste caso o jest importaria o Products.tsx sem o provider, o que causa erro nos testes
  */
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
