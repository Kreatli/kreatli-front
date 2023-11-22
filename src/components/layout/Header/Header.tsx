import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import { NotificationButton } from 'components/notifications/NotificationButton';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useSession } from '../../../hooks/useSession';
import { SignInModal } from '../../auth/SignInModal';
import { Icon } from '../../various/Icon';

export const Header = () => {
  const router = useRouter();
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSignedIn, currentUser, signOut } = useSession();

  React.useEffect(() => {
    setIsNavbarOpen(false);
  }, [router.pathname]);

  const navigationItems = [
    ...(isSignedIn ? [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'Jobs',
        href: '/jobs',
      },
      {
        label: 'Professionals',
        href: '/professionals',
      },
      {
        label: 'Messages',
        href: '/chat',
      },
    ] : []),
  ];

  const dropdownItems = [
    ...(!isSignedIn ? [{
      label: 'Sign in',
      key: 'signIn',
    }] : [
      {
        label: 'Account',
        key: 'myAccount',
      },
      {
        label: 'Connections',
        key: 'connections',
      },
      {
        label: 'My jobs',
        key: 'myJobs',
      },
    ]),
    {
      label: 'FAQ',
      key: 'faq',
    },
    {
      label: 'Contact',
      key: 'contact',
    },
    ...(isSignedIn ? [{
      label: 'Sign out',
      key: 'signOut',
      className: 'text-danger',
      color: 'danger' as const,
    }] : []),
  ];

  const dropdownActions = {
    contact: () => router.push('/contact'),
    faq: () => router.push('/faq'),
    myAccount: () => router.push(`/profile/${currentUser?._id}`),
    connections: () => router.push(`/profile/${currentUser?._id}/connections`),
    myJobs: () => router.push(`/profile/${currentUser?._id}/jobs`),
    signIn: onOpen,
    signOut,
  };

  const handleUserMenuAction = (key: React.Key) => {
    const action = dropdownActions[key as keyof typeof dropdownActions];

    action?.();
  };

  const handleSignUpAction = (key: React.Key) => {
    router.push(`/signup/${key}`);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const userInitials = React.useMemo(() => {
    return currentUser?.name?.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [currentUser?.name]);

  return (
    <Navbar isBlurred maxWidth="xl" className="shadow-medium z-50" isMenuOpen={isNavbarOpen} onMenuOpenChange={setIsNavbarOpen}>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" aria-label="Toggle navigation" />
        <NavbarBrand>
          <NextLink href="/">
            <LogoIcon viewBox="0 0 90 22" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {navigationItems.map(({ label, ...rest }) => (
          <NavbarItem key={label} isActive={router.pathname.includes(rest.href)}>
            <Link as={NextLink} color="foreground" {...rest}>{label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          <NotificationButton />
          <Button
            isIconOnly
            aria-label="Toggle theme"
            variant="light"
            className="text-foreground"
            radius="full"
            onClick={toggleTheme}
          >
            <Icon icon="sun" />
          </Button>
        </NavbarItem>
        {!isSignedIn && (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" color="secondary">Sign up</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sign up" variant="flat" color="secondary" onAction={handleSignUpAction}>
                <DropdownItem key="creator">As Creator</DropdownItem>
                <DropdownItem key="professional">As Professional</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              as="button"
              src={currentUser?.avatarUrl}
              name={userInitials}
              icon={!isSignedIn && <Icon icon="user" size={20} />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu" variant="flat" onAction={handleUserMenuAction}>
            {dropdownItems.map(({ label, ...props }) => (
              <DropdownItem {...props}>{label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu className="pt-4">
        {navigationItems.map(({ label, ...props }) => (
          <NavbarMenuItem key={label}>
            <Link as={NextLink} color="foreground" {...props} className="w-full" size="lg">
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </Navbar>
  );
};
