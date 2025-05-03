import { Button } from '@heroui/react';
import React from 'react';

import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { Layout } from '../../../../typings/layout';
import { Icon } from '../../../various/Icon';
import { UserWidget } from '../../layout/Header/UserWidget';

export const AssetPanelHeader = () => {
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
    <div className="bg-foreground-50 p-3 px-6 flex gap-4 items-center justify-end h-16">
      <Button isIconOnly aria-label="Toggle theme" variant="light" radius="full" onClick={toggleTheme}>
        <Icon icon={theme === 'dark' ? 'sun' : 'moon'} size={18} />
      </Button>
      <UserWidget />
    </div>
  );
};
