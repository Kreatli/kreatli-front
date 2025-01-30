/* eslint-disable @typescript-eslint/indent */
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import LogoIcon from '../../../../assets/images/logo.svg';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { useSignUpCreatorModal } from '../../../../hooks/marketplace/useSignUpCreatorModal';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Layout } from '../../../../typings/layout';
import { Icon } from '../../../various/Icon';
import { SignInModal } from '../../auth/SignInModal';
import { HeaderNotificationsButtons } from './HeaderNotificationsButtons';

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
    ...(isSignedIn
      ? [
          {
            label: 'Feed',
            href: '/marketplace',
          },
          {
            label: 'Jobs',
            href: '/marketplace/jobs',
          },
          {
            label: 'Professionals',
            href: '/marketplace/professionals',
          },
          {
            label: 'Dashboard',
            href: '/marketplace/dashboard',
          },
          ...(currentUser?.role === 'admin'
            ? [
                {
                  label: 'Admin panel',
                  href: '/marketplace/admin',
                },
              ]
            : []),
        ]
      : []),
  ];

  const commonItems = [
    {
      as: NextLink,
      href: '/marketplace/faq',
      label: 'FAQ',
      key: 'faq',
    },
    {
      as: NextLink,
      href: '/marketplace/contact',
      label: 'Contact',
      key: 'contact',
    },
  ];

  const anonymousSections = [
    [
      {
        label: 'Sign in',
        key: 'signIn',
      },
      ...commonItems,
    ],
  ];

  const signedSections = [
    [
      {
        as: NextLink,
        href: `/marketplace/profile/${currentUser?._id}`,
        label: 'My profile',
        key: 'myProfile',
      },
      {
        as: NextLink,
        href: '/marketplace/dashboard',
        label: 'Dashboard',
        key: 'dashboard',
      },
    ],
    [
      {
        as: NextLink,
        href: `/marketplace/profile/${currentUser?._id}/jobs`,
        label: 'My jobs',
        key: 'myJobs',
      },
      {
        as: NextLink,
        href: '/marketplace/chat',
        label: 'Messages',
        key: 'messages',
      },
      {
        as: NextLink,
        href: `/marketplace/profile/${currentUser?._id}/connections`,
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

  const userWidgetSections = isSignedIn ? signedSections : anonymousSections;

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

    router.push(`/marketplace/signup/${key}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar
      isBlurred
      maxWidth="xl"
      className="shadow-medium z-50"
      isMenuOpen={isNavbarOpen}
      onMenuOpenChange={setIsNavbarOpen}
    >
      <NavbarContent>
        {isSignedIn && <NavbarMenuToggle className="sm:hidden" aria-label="Toggle navigation" />}
        <NavbarItem>
          <NavbarBrand>
            <NextLink href="/marketplace" aria-label="Kreatli">
              <LogoIcon viewBox="0 0 90 22" />
            </NextLink>
            {currentUser?.role === 'admin' && (
              <Badge content="admin" size="sm" color="secondary" variant="flat">
                <div className="opacity-0">__</div>
              </Badge>
            )}
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      {navigationItems.length > 0 && (
        <NavbarContent justify="center" className="hidden sm:flex">
          {navigationItems.map(({ label, ...rest }) => (
            <NavbarItem key={label} isActive={router.pathname === rest.href}>
              <Link as={NextLink} color="foreground" {...rest}>
                {label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center">
          {isSignedIn && <HeaderNotificationsButtons />}
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
                <Button variant="flat" color="secondary">
                  Sign up
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sign up" variant="flat" color="secondary" onAction={handleSignUpAction}>
                <DropdownItem key="creator">As YouTube Creator</DropdownItem>
                <DropdownItem key="professional">As Professional</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as="button"
                src={currentUser?.avatarUrl}
                color="secondary"
                className="bg-secondary/20 text-secondary"
                name={currentUser?.name}
                icon={!isSignedIn && <Icon icon="user" size={20} />}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User menu"
              disabledKeys={['kreatli-premium']}
              variant="flat"
              onAction={handleUserMenuAction}
            >
              {userWidgetSections.map((section, index) => (
                <DropdownSection key={index} showDivider={userWidgetSections.length - 1 !== index}>
                  {section.map(({ label, ...rest }) => (
                    <DropdownItem {...rest}>{label}</DropdownItem>
                  ))}
                </DropdownSection>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
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
