import { CarBrandCombobox } from '@/app/components/CarBrandCombobox';
import { CarModelCombobox } from '@/app/components/CarModelCombobox';
import { Drawer } from '@base-ui/react/drawer';
import { FunnelIcon } from '@heroicons/react/16/solid';

export function FilterDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-full outline outline-1 -outline-offset-1 outline-gray-300 p-2 active:bg-gray-50 active:outline-brand transition-all">
        <FunnelIcon className="size-5 text-brand" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop
          className={[
            'fixed inset-0 min-h-[100dvh] bg-black',
            // Opacidade padrão
            'opacity-20',
            // Transição
            'transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
            // Estado inicial e final: opacity 0
            'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
            // Durante swipe: sem transição
            'data-[swiping]:duration-0',
          ].join(' ')}
        />
        <Drawer.Viewport className="fixed inset-0 flex items-end justify-center">
          <Drawer.Popup
            className={[
              'w-full max-h-[80vh] bg-white',
              'px-6 pb-6 pt-4 outline-none overflow-y-auto overscroll-contain',
              'shadow-[0.25rem_0.25rem_0_rgb(0_0_0_/_12%)]',
              // Animação
              'transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
              'translate-y-0',
              'data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
              'data-[swiping]:select-none',
              'will-change-transform',
            ].join(' ')}
          >
            <div className="w-[3rem] h-[0.25rem] bg-neutral-200 mx-auto rounded-full mt-2 mb-4"></div>
            <Drawer.Content className="w-full max-w-[32rem] mx-auto my-2 px-4 space-y-4">
              <Drawer.Title className="text-neutral-600 uppercase">
                Pesquise pneus pelo seu <b>veículo</b>
              </Drawer.Title>
              <CarBrandCombobox />
              <CarModelCombobox />
              <div className="flex justify-center self-baseline pt-6">
                <Drawer.Close className="p-1.5 w-full bg-neutral-800 text-white rounded-full">
                  Fechar
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
