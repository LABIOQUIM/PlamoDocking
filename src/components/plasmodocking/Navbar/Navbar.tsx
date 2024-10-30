'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {  useTranslations } from 'next-intl';

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import renderItalic from '@/utils/renderItalic';
import LocaleSwitcher from '../i18n/LocaleSwitcher';
import { useAuthStore } from '@/store/auth-store';

const ResponsiveAppBar: React.FC = () => {

  const { isAuthenticated, logout } = useAuthStore();

  const t = useTranslations('Navbar');

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
    <nav className="fixed top-0 h-[70px] bg-[#263554] px-10 py-5 flex justify-between items-center w-full z-[1000] border-b-2 border-black">
      <div className="flex">
        <Image
          className='rounded w-auto'
          src="/logos/iconeplasmodockingBranco.png"
          alt="Your Company"
          width={60}
          height={60}
        />
        <span className='text-white my-auto font-semibold mx-2'>{t('plasmodocking')}</span>
      </div>
      <div className="flex items-center gap-8">
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
            {isAuthenticated &&
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger><em>{t('falciparum')}</em></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {componentsFalciparum.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={`${component.href}`}
                          description={component.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger><em>{t('vivax')}</em></NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {componentsVivax.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={`${component.href}`}
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
            }

          </NavigationMenuList>
        </NavigationMenu>
        <LocaleSwitcher />

        {isAuthenticated
          ? <div className='bg-transparent border-2 border-blue-600 rounded-lg'>
            <Button
              variant="outline"
              onClick={() => logout()}
              className='text-base bg-transparent text-white'>{t('logout')}</Button>
          </div>
          : <>
            <Link href={`/auth/login`}>
              <div className='bg-transparent border-2 border-blue-600 rounded-lg'>
                <Button
                  variant="outline"
                  className='text-base bg-transparent text-white'>{t('login')}</Button>
              </div>
            </Link>
          </>
        }
      </div>
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
