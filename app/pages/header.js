"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Home, Rabbit, Waypoints, Cookie, HandCoins, Dog, Cog, Columns4 } from "lucide-react";
import Link from 'next/link';

const navigation = [
  { name: "Dashboard", href: "/pages/home", icon: Home },
  { name: "Reproducteurs", href: "/pages/reproducteurs", icon: Rabbit },
  { name: "Lapins", href: "/pages/lapins", icon: Dog },
  { name: "Reproduction", href: "/pages/reproduction", icon: Waypoints },
  { name: "Ventes", href: "/pages/ventes", icon: HandCoins },
  { name: "Enclos", href: "/pages/cages", icon: Columns4 },
  { name: "Aliments", href: "/pages/aliments", icon: Cookie },
  { name: "Paramètres", href: "/pages/settings", icon: Cog },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image src="/favicon.png" alt="Logo admin ferme" width={25} height={25} />
              <span className="ml-3 text-orange-500">AdminFerme</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-8">
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "border-b-2 border-orange-500 text-orange-800"
                          : "text-gray-500 hover:text-orange-700",
                        "flex items-center gap-2 py-2 text-sm font-medium"
                      )}
                    >
                      {item.icon && <item.icon size={18} />}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="relative rounded-full bg-gray-50 p-1 text-gray-700 hover:text-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none">
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive ? "bg-orange-300 text-white" : "text-orange-800 hover:bg-orange-700 hover:text-white",
                  "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.icon && <item.icon size={20} />}
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
