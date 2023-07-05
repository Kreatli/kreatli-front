import { Dropdown, Text } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Common } from '../../../typings/common';
import { Icon, IconType } from '../Icon';
import styles from './Menu.module.scss';

interface Props {
  label: string;
  description?: string;
  href?: string;
  icon?: IconType;
  emoji?: Common.Emoji;
  options?: { label: string; value: string }[];
  selectionMode?: 'single' | 'multiple';
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onSelect?: (values: string[]) => void;
}

export const MenuItem = ({ href, label, description, icon, emoji, options, selectionMode = 'multiple', isSelected, onClick, onSelect }: Props) => {
  const { pathname } = useRouter();
  const [isCancelable, setIsCancelable] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set([]));

  const handleSelectChange = React.useCallback((keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') {
      return;
    }

    setSelected(keys);

    onSelect?.(Array.from(keys) as string[]);
  }, [onSelect]);

  const menuItemContent = React.useMemo(() => {
    const selectDescription = Array.from(selected).map((key) => options?.find(({ value }) => value === key)?.label).join(', ');

    return (
      <>
        {(icon || emoji) && (
          <span className={styles.icon}>
            {icon && <Icon icon={icon} />}
            {emoji && `${emoji}`}
          </span>
        )}
        <span className={styles.content}>
          <Text size="small" weight="semibold">{label}</Text>
          {(description || selectDescription) && <Text size="x-small" color="$accents6" className={styles.description}>{description || selectDescription}</Text>}
        </span>
        {isSelected && (
          <>
            <Icon icon="check" className={styles.check} />
            <Icon icon="cross" className={styles.cross} />
          </>
        )}
      </>
    );
  }, [description, emoji, icon, isSelected, label, options, selected]);

  const classNames = cx(styles.item, {
    [styles.active]: pathname === href || isDropdownOpen,
    [styles.selected]: isSelected,
    [styles.cancelable]: isCancelable,
  });

  if (options) {
    return (
      <div className={styles.wrapper}>
        {isSelected && !isDropdownOpen && (
          <button
            type="button"
            aria-label="Reset"
            onClick={() => handleSelectChange(new Set())}
            className={styles.clearButton}
          />
        )}
        <Dropdown placement="top-right" onOpenChange={setIsDropdownOpen}>
          <Dropdown.Trigger>
            <button type="button" className={classNames} onClick={onClick}>
              {menuItemContent}
            </button>
          </Dropdown.Trigger>
          <Dropdown.Menu
            aria-label={label}
            selectionMode={selectionMode}
            selectedKeys={selected}
            onSelectionChange={handleSelectChange}
          >
            {options.map((option) => (
              <Dropdown.Item key={option.value}>
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  const cancelListeners = {
    onMouseEnter: () => {
      if (isSelected) {
        setIsCancelable(true);
      }
    },
    onMouseLeave: () => {
      setIsCancelable(false);
    },
  };

  if (href) {
    return (
      <Link href={href} className={classNames} onClick={onClick} {...cancelListeners}>
        {menuItemContent}
      </Link>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onClick} {...cancelListeners}>
      {menuItemContent}
    </button>
  );
};
