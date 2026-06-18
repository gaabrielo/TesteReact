'use client';

import { ProductType } from '@/app/api/products/route';
import { useContext, useEffect, useMemo, useState, createContext } from 'react';
import toast from 'react-hot-toast';

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

// Separa marca de carro do modelo
function parseCar(car: string): { brand: string; model: string } {
  const [brand, ...rest] = car.split(' ');
  return { brand, model: rest.join(' ') };
}

interface FilterContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBrand: string | null;
  setSelectedBrand: (value: string | null) => void;
  selectedCarModel: string | null;
  setSelectedCarModel: (value: string | null) => void;
  filteredProducts: ProductType[];
  allBrands: string[];
  availableCarModels: string[];
  isLoading: boolean;
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCarModel, setSelectedCarModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products: ', error);

        /*
          Utilizei a lib react-hot-toast para notificar possiveis erros ao carregar os produtos
        */
        toast.error('Não foi possível carregar os produtos. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const allBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      p.cars.forEach((car) => set.add(parseCar(car).brand)),
    );
    return Array.from(set).sort();
  }, [products]);

  // Quando a marca muda, reseta o modelo selecionado
  function handleSetSelectedBrand(value: string | null) {
    setSelectedBrand(value);
    setSelectedCarModel(null);
  }

  // Modelos disponíveis com base na marca selecionada
  const availableCarModels = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      p.cars.forEach((car) => {
        const { brand, model } = parseCar(car);
        if (!selectedBrand || brand === selectedBrand) {
          set.add(model);
        }
      }),
    );
    return Array.from(set).sort();
  }, [products, selectedBrand]);

  const filteredProducts = useMemo(() => {
    const tokens = tokenize(searchTerm);

    return products.filter((product) => {
      const matchesSearch =
        tokens.length === 0 ||
        matchesTokens(tokens, product.name, product.model, ...product.cars);

      const matchesBrandAndModel = product.cars.some((car) => {
        const { brand, model } = parseCar(car);
        const brandMatch = !selectedBrand || brand === selectedBrand;
        const modelMatch = !selectedCarModel || model === selectedCarModel;
        return brandMatch && modelMatch;
      });

      return matchesSearch && matchesBrandAndModel;
    });
  }, [products, searchTerm, selectedBrand, selectedCarModel]);

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedBrand,
        setSelectedBrand: handleSetSelectedBrand,
        selectedCarModel,
        setSelectedCarModel,
        filteredProducts,
        allBrands,
        availableCarModels,
        isLoading,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
