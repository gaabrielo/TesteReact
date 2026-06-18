'use client';

import { CarBrandCombobox } from '@/app/components/CarBrandCombobox';
import { CarModelCombobox } from '@/app/components/CarModelCombobox';
import { useFilter } from '@/app/contexts/filter-context';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import toast from 'react-hot-toast';

export function Header() {
  const { searchTerm, setSearchTerm } = useFilter();

  return (
    <header className="w-full flex flex-col gap-4 sm:flex-row items-center mb-8">
      {/* Logo */}
      <div className="relative w-60 h-10">
        <Image
          src="/images/logo-pneufree.svg"
          alt="Logo"
          quality={100}
          fill
          className="object-contain object-left"
        />
      </div>

      <div className="w-full flex items-center flex-1">
        {/* Search field */}
        <div className="border-gray-500 w-full md:w-3/5 xl:w-1/3 ml-auto xl:mr-2">
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
              className="col-start-1 row-start-1 block w-full rounded-full bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand sm:pl-9 sm:text-sm/6"
            />
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center sr-only xl:not-sr-only gap-2">
          <CarBrandCombobox />
          <CarModelCombobox />
        </div>
        <button
          onClick={() =>
            toast.error(
              'Não foi possível carregar os produtos. Tente novamente.',
            )
          }
          className="not-sr-only xl:sr-only ml-2 rounded-full outline outline-1 -outline-offset-1 outline-gray-300 p-2 self-end active:bg-gray-50 active:outline-brand transition-all"
        >
          <FunnelIcon className="size-5 text-brand" />
        </button>
      </div>
    </header>
  );
}
