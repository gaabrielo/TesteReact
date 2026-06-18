'use client';

import * as React from 'react';
import { useFilter } from '@/app/contexts/filter-context';
import { Combobox } from '@base-ui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/16/solid';

export function CarModelCombobox() {
  const id = React.useId();
  const { selectedCarModel, setSelectedCarModel, availableCarModels } =
    useFilter();

  return (
    <Combobox.Root
      items={availableCarModels}
      value={selectedCarModel}
      onValueChange={setSelectedCarModel}
    >
      <div className="relative">
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900 mb-2"
        >
          Modelo
        </label>
        <Combobox.InputGroup className="relative">
          <Combobox.Input
            id={id}
            className="block w-full rounded-full bg-white py-1.5 px-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand sm:text-sm/6"
          />
          <div className="absolute flex items-center justify-center h-full right-0 bottom-0">
            <Combobox.Clear
              className="flex items-center justify-center w-[1.5rem] h-full"
              aria-label="Clear selection"
            >
              <XMarkIcon className="size-4" />
            </Combobox.Clear>
            <Combobox.Trigger
              className="flex items-center justify-center w-[1.5rem] h-full"
              aria-label="Open popup"
            >
              <ChevronDownIcon className="size-4" />
            </Combobox.Trigger>
          </div>
        </Combobox.InputGroup>
      </div>

      <Combobox.Portal>
        <Combobox.Backdrop />
        <Combobox.Positioner>
          <Combobox.Popup className="z-10 mt-1 w-[var(--anchor-width)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-1 outline-gray-200 sm:text-sm">
            <Combobox.Empty>
              <div className="relative cursor-default select-none py-2 px-3 text-gray-400 hover:bg-indigo-50">
                Nenhum modelo encontrado
              </div>
            </Combobox.Empty>
            <Combobox.List>
              {(item) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className="relative cursor-default select-none py-2 px-3 text-gray-900 hover:bg-indigo-50 data-[highlighted]:bg-indigo-100"
                >
                  {item}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
