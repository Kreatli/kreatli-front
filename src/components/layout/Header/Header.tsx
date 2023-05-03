import { Avatar, Dropdown, DropdownItemProps, Navbar } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// TODO: get rid of ts-ignore
// @ts-ignore
import logoImage from '../../../assets/images/logo.svg?url';
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
  const { isVisible, openModal, closeModal } = useModalVisibility();
  const { isSignedIn, isLoading, user, signOut } = useSession();

  const navigationItems = [
    ...(isSignedIn ? [{
      label: 'Professionals',
      href: '/professionals',
    }] : []),
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
    myAccount: () => router.push(`/profile/${user?._id}`),
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
    return user?.name?.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [user]);

  return (
    <Navbar variant="sticky">
      <Navbar.Content>
        <Navbar.Toggle aria-label="Toggle navigation" showIn="sm" />
        <Navbar.Brand>
          <Link href="/">
            <Image src={logoImage} alt="Kreatli" />
          </Link>
        </Navbar.Brand>
      </Navbar.Content>
      <Navbar.Content hideIn="sm">
        {navigationItems.map(({ label, ...props }) => (
          <Navbar.Link as={Link} key={label} {...props}>{label}</Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        {!isSignedIn && !isLoading && (
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
              src={user?.avatarUrl}
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
      {!isSignedIn && (
        <SignInModal isVisible={isVisible} onClose={closeModal} />
      )}
    </Navbar>
  );
};
