'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import renderItalic from '@/utils/renderItalic';
import LocaleSwitcher from '../i18n/LocaleSwitcher';
import { useAuthStore } from '@/store/auth-store';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const ResponsiveAppBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const t = useTranslations('Navbar');
  const [menuOpen, setMenuOpen] = useState(false);

  const componentsVivax: { title: string; href: string; description: string }[] = [
    {
      title: renderItalic(t('plasmodium_vivax_with_redocking')),
      // href: `/plasmodocking/vivax/with-redocking`,
      // description: renderItalic(t('plasmodium_vivax_with_redocking_description')),
      href: "",
      description: renderItalic(t('plasmodium_vivax_without_redocking_description')),
    },
    {
      title: renderItalic(t('plasmodium_vivax_without_redocking')),
      href: "",
      description: renderItalic(t('plasmodium_vivax_without_redocking_description')),
    }
  ]
  const componentsFalciparum: { title: string; href: string; description: string }[] = [
    {
      title: renderItalic(t('plasmodium_falciparum_with_redocking')),
      href: "/plasmodocking/falciparum/with-redocking",
      description: renderItalic(t('plasmodium_falciparum_with_redocking_description')),
    },
    {
      title: renderItalic(t('plasmodium_falciparum_without_redocking')),
      href: "/plasmodocking/falciparum/without-redocking",
      description: renderItalic(t('plasmodium_falciparum_without_redocking_description')),
    }
  ]
  return (
    <nav className="fixed top-0 h-[70px] bg-[#263554] px-5 md:px-10 py-5 flex justify-between items-center w-full z-[1000] border-b-2 border-black">
      <div className="flex items-center">
        <Image
          className='rounded w-auto'
          src="/logos/iconeplasmodockingBranco.png"
          alt="Your Company"
          width={50}
          height={50}
        />
        <span className='text-white my-auto font-semibold mx-2'>{t('plasmodocking')}</span>
      </div>

      {/* Menu para desktop */}
      <div className="hidden md:flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('home')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={`/about`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('about')}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger><em>{t('falciparum')}</em></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:grid-cols-2 lg:w-[600px]">
                      {componentsFalciparum.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          description={component.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger><em>{t('vivax')}</em></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:grid-cols-2 lg:w-[600px]">
                      {componentsVivax.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          description={component.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href={`/result`} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t('result')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <LocaleSwitcher />

        {isAuthenticated ? (
          <Button variant="outline" onClick={logout} className='text-base bg-transparent text-white'>
            {t('logout')}
          </Button>
        ) : (
          <Link href={`/auth/login`}>
            <Button variant="outline" className='text-base bg-transparent text-white'>
              {t('login')}
            </Button>
          </Link>
        )}
      </div>

      {/* Menu para mobile */}
      <div className="flex md:hidden">
        <Button variant="outline" onClick={() => setMenuOpen(!menuOpen)} className="text-black">
          {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </Button>
      </div>

      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-[#263554] p-5 md:hidden z-[999]">
          <ul className="flex flex-col gap-4 text-white">
            {/* Link para Home */}
            <li>
              <Link
                href="/"
                className="block w-full py-3 px-4 rounded-md shadow-md hover:bg-white hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                {t('home')}
              </Link>
            </li>

            {/* Link para About */}
            <li>
              <Link
                href="/about"
                className="block w-full py-3 px-4 rounded-md shadow-md hover:bg-white hover:text-black"
                onClick={() => setMenuOpen(false)}
              >
                {t('about')}
              </Link>
            </li>

            {/* Links adicionais para usuários autenticados */}
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/plasmodocking/falciparum/with-redocking"
                    className="block w-full py-3 px-4 rounded-md shadow-md hover:bg-white hover:text-black"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('plasmodium_falciparum_with_redocking')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plasmodocking/falciparum/without-redocking"
                    className="block w-full py-3 px-4 rounded-md shadow-md hover:bg-white hover:text-black"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('plasmodium_falciparum_without_redocking')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/result"
                    className="block w-full py-3 px-4 rounded-md shadow-md hover:bg-white hover:text-black"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('result')}
                  </Link>
                </li>
              </>
            )}

            {/* Botão de Login ou Logout */}
            <li className="mt-4">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full py-3 px-4 rounded-md text-base bg-transparent text-white shadow-md hover:bg-gray-600"
                >
                  {t('logout')}
                </Button>
              ) : (
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full py-3 px-4 rounded-md text-base bg-transparent text-white shadow-md hover:bg-gray-600"
                  >
                    {t('login')}
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { href: string; description: string }
>(({ className, title, href, description, ...props }, ref) => {
  return (
    <li>
      <Link href={href} passHref>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-semibold leading-none" dangerouslySetInnerHTML={{ __html: title || '' }} />
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground" dangerouslySetInnerHTML={{ __html: description || '' }} />
          </a>
        </NavigationMenuLink>
      </Link>
    </li>
  )
});
ListItem.displayName = "ListItem";

export default ResponsiveAppBar;
