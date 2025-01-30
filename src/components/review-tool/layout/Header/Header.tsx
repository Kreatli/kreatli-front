import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import LogoIcon from '../../../../assets/images/logo.svg';
import { useSession } from '../../../../hooks/review-tool/useSession';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Layout } from '../../../../typings/layout';
import { Icon } from '../../../various/Icon';
import { UserWidget } from './UserWidget';

export const Header = () => {
  const { isSignedIn } = useSession();
  const [theme, setTheme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar maxWidth="full">
      <NavbarContent>
        <NavbarItem>
          <NavbarBrand>
            <NextLink href="/">
              <LogoIcon viewBox="0 0 90 22" />
            </NextLink>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly aria-label="Toggle theme" variant="light" radius="full" onClick={toggleTheme}>
            <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </Button>
        </NavbarItem>
        {isSignedIn && (
          <NavbarItem>
            <UserWidget />
          </NavbarItem>
        )}
        {!isSignedIn && (
          <>
            <NavbarItem>
              <Link as={NextLink} href="/marketplace" color="foreground">
                Kreatli marketplace
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={NextLink} href="/sign-in" color="foreground">
                Sign in
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={NextLink} href="/sign-up" color="secondary">
                Start for free
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
