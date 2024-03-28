import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useSession } from '../../../hooks/useSession';
import { useSignUpCreatorModal } from '../../../hooks/useSignUpCreatorModal';
import { Layout } from '../../../typings/layout';
import { SignInModal } from '../../auth/SignInModal';
import { NotificationButton } from '../../notifications/NotificationButton';
import { Icon } from '../../various/Icon';

export const Header = () => {
  const router = useRouter();
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSignedIn, currentUser, signOut } = useSession();
  const { open: openSignUpCreatorModal } = useSignUpCreatorModal();
  const [theme, setTheme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  React.useEffect(() => {
    setIsNavbarOpen(false);
  }, [router.pathname]);

  const navigationItems = [
    ...(isSignedIn ? [
      {
        label: 'Feed',
        href: '/',
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
        label: 'Dashboard',
        href: '/dashboard',
      },
      ...(currentUser?.role === 'admin' ? [{
        label: 'Admin panel',
        href: '/admin',
      }] : []),
    ] : []),
  ];

  const commonItems = [
    {
      as: NextLink,
      href: '/faq',
      label: 'FAQ',
      key: 'faq',
    },
    {
      as: NextLink,
      href: '/contact',
      label: 'Contact',
      key: 'contact',
    },
  ];

  const anonymousSections = [[
    {
      label: 'Sign in',
      key: 'signIn',
    },
    ...commonItems,
  ]];

  const signedSections = [
    [
      {
        as: NextLink,
        href: `/profile/${currentUser?._id}`,
        label: 'My profile',
        key: 'myProfile',
      },
      {
        as: NextLink,
        href: '/dashboard',
        label: 'Dashboard',
        key: 'dashboard',
      },
    ],
    [
      {
        as: NextLink,
        href: `/profile/${currentUser?._id}/jobs`,
        label: 'My jobs',
        key: 'myJobs',
      },
      {
        as: NextLink,
        href: '/chat',
        label: 'Messages',
        key: 'messages',
      },
      {
        as: NextLink,
        href: `/profile/${currentUser?._id}/connections`,
        label: 'Connections',
        key: 'connections',
      },
    ],
    [
      {
        label: 'Kreatli Premium',
        key: 'kreatli-premium',
        description: 'Coming soon',
      },
      ...commonItems,
      {
        label: 'Sign out',
        key: 'signOut',
        className: 'text-danger',
        color: 'danger' as const,
      },
    ],
  ];

  const userWidgetSections = isSignedIn
    ? signedSections
    : anonymousSections;

  const dropdownActions = {
    signIn: onOpen,
    signOut,
  };

  const handleUserMenuAction = (key: React.Key) => {
    const action = dropdownActions[key as keyof typeof dropdownActions];

    action?.();
  };

  const handleSignUpAction = (key: React.Key) => {
    if (key === 'creator') {
      openSignUpCreatorModal();

      return;
    }

    router.push(`/signup/${key}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const userInitials = React.useMemo(() => {
    return currentUser?.name?.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [currentUser?.name]);

  return (
    <Navbar isBlurred maxWidth="xl" className="shadow-medium z-50" isMenuOpen={isNavbarOpen} onMenuOpenChange={setIsNavbarOpen}>
      <NavbarContent>
        {isSignedIn && <NavbarMenuToggle className="sm:hidden" aria-label="Toggle navigation" />}
        <NavbarBrand>
          <NextLink href="/">
            <LogoIcon viewBox="0 0 90 22" />
          </NextLink>
          {currentUser?.role === 'admin' && (
            <Badge content="admin" size="sm" color="secondary" variant="flat">
              <div className="opacity-0">__</div>
            </Badge>
          )}
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {navigationItems.map(({ label, ...rest }) => (
          <NavbarItem key={label} isActive={router.pathname === rest.href}>
            <Link as={NextLink} color="foreground" {...rest}>{label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          {isSignedIn && (
            <>
              <Button
                as={NextLink}
                href="/chat"
                isIconOnly
                aria-label="Open messages"
                variant="light"
                className="text-foreground"
                radius="full"
              >
                <Icon icon="chat" size={20} />
              </Button>
              <NotificationButton />
            </>
          )}
          <Button
            isIconOnly
            aria-label="Toggle theme"
            variant="light"
            color="secondary"
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
                <DropdownItem key="creator">As YouTube Creator</DropdownItem>
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
              color="secondary"
              className="bg-secondary/20 text-secondary"
              name={userInitials}
              icon={!isSignedIn && <Icon icon="user" size={20} />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu" disabledKeys={['kreatli-premium']} variant="flat" onAction={handleUserMenuAction}>
            {userWidgetSections.map((section, index) => (
              <DropdownSection key={index} showDivider={userWidgetSections.length - 1 !== index}>
                {section.map(({ label, ...rest }) => (
                  <DropdownItem {...rest}>{label}</DropdownItem>
                ))}
              </DropdownSection>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu className="pt-4">
        {navigationItems.map(({ label, ...rest }) => (
          <NavbarMenuItem key={label}>
            <Link as={NextLink} color="foreground" {...rest} className="w-full" size="lg">
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </Navbar>
  );
};
