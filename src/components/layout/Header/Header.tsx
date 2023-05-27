import { Avatar, Button, Dropdown, DropdownItemProps, Navbar, useTheme } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme as useNextTheme } from 'next-themes';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useModalVisibility } from '../../../hooks/useModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { SignInModal } from '../../auth/SignInModal';
import { Icon } from '../../various/Icon';

interface DropdownItem extends Partial<DropdownItemProps> {
  label: string;
  key: string;
}

export const Header: React.FC = () => {
  const router = useRouter();
  const { isModalVisible, openModal, closeModal } = useModalVisibility();
  const { isSignedIn, currentUser, signOut } = useSession();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const navigationItems = [
    ...(isSignedIn ? [
      {
        label: 'Professionals',
        href: '/professionals',
      },
      {
        label: 'Creators',
        href: '/creators',
      },
    ] : []),
  ];

  const dropdownItems: DropdownItem[] = [
    !isSignedIn ? {
      label: 'Sign in',
      color: 'primary' as const,
      key: 'signIn',
    } : {
      label: 'My account',
      color: 'primary' as const,
      key: 'myAccount',
    },
    ...(isSignedIn ? [{
      label: 'Connections',
      key: 'connections',
    }] : []),
    {
      label: 'FAQ',
      key: 'faq',
      withDivider: true,
    },
    {
      label: 'Contact',
      key: 'contact',
    },
    ...(isSignedIn ? [{
      label: 'Sign out',
      key: 'signOut',
      color: 'error' as const,
      withDivider: true,
    }] : []),
  ];

  const dropdownActions = {
    contact: () => router.push('/contact'),
    faq: () => router.push('/faq'),
    myAccount: () => router.push(`/profile/${currentUser?._id}`),
    connections: () => router.push(`/profile/${currentUser?._id}/connections`),
    signIn: openModal,
    signOut,
  };

  const handleUserMenuAction = (key: React.Key) => {
    const action = dropdownActions[key as keyof typeof dropdownActions];

    action?.();
  };

  const handleSignUpAction = (key: React.Key) => {
    router.push(`/signup/${key}`);
  };

  const userInitials = React.useMemo(() => {
    return currentUser?.name?.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [currentUser?.name]);

  return (
    <Navbar variant="sticky" css={{ zIndex: '$3' }}>
      <Navbar.Content>
        <Navbar.Toggle aria-label="Toggle navigation" showIn="sm" />
        <Navbar.Brand>
          <Link href="/">
            <LogoIcon viewBox="0 0 90 22" />
          </Link>
        </Navbar.Brand>
      </Navbar.Content>
      <Navbar.Content hideIn="sm">
        {navigationItems.map(({ label, ...props }) => (
          <Navbar.Link as={Link} key={label} {...props}>{label}</Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            icon={<Icon icon={isDark ? 'sun' : 'moon'} />}
            light
            rounded
            auto
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          />
        </Navbar.Item>
        {!isSignedIn && (
          <Navbar.Item>
            <Dropdown>
              <Dropdown.Button auto flat color="secondary">Sign up</Dropdown.Button>
              <Dropdown.Menu aria-label="Sign up" color="secondary" onAction={handleSignUpAction}>
                <Dropdown.Item key="creator">As Creator</Dropdown.Item>
                <Dropdown.Item key="professional">As Professional</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Item>
        )}
        <Dropdown>
          <Dropdown.Trigger>
            <Avatar
              as="button"
              src={currentUser?.avatarUrl}
              text={userInitials}
              textColor="primary"
              icon={!isSignedIn && <Icon icon="user" size={20} />}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu aria-label="User menu" onAction={handleUserMenuAction}>
            {dropdownItems.map(({ label, ...props }) => (
              <Dropdown.Item {...props}>{label}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {navigationItems.map(({ label, ...props }) => (
          <Navbar.CollapseItem key={label}>
            <Link {...props}>
              {label}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
      <SignInModal isVisible={isModalVisible} onClose={closeModal} />
    </Navbar>
  );
};
