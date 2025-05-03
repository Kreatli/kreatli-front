import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import cx from 'classnames';
import NextLink from 'next/link';
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
  options?: { label: string; value: string | number }[];
  selectionMode?: 'single' | 'multiple';
  selectedKeys?: Set<string | number>;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onSelect?: (values: string[]) => void;
}

export const MenuItem = ({
  href,
  label,
  description,
  icon,
  emoji,
  options,
  selectionMode = 'multiple',
  selectedKeys = new Set([]),
  isSelected,
  onClick,
  onSelect,
}: Props) => {
  const { pathname } = useRouter();
  const [isCancelable, setIsCancelable] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleSelectChange = React.useCallback(
    (keys: 'all' | Set<string | number>) => {
      if (keys === 'all') {
        return;
      }

      onSelect?.(Array.from(keys) as string[]);
    },
    [onSelect],
  );

  const menuItemContent = React.useMemo(() => {
    const selectDescription = Array.from(selectedKeys)
      .map((key) => options?.find(({ value }) => value === key)?.label)
      .join(', ');

    return (
      <>
        {(icon || emoji) && (
          <span className={styles.icon}>
            {icon && <Icon icon={icon} />}
            {emoji && `${emoji}`}
          </span>
        )}
        <span className={styles.content}>
          <p className="text-xs font-semibold mb-0.5">{label}</p>
          {(description || selectDescription) && (
            <p className="text-[0.65rem] tracking-tight text-gray-400">{description || selectDescription}</p>
          )}
        </span>
        {isSelected && (
          <>
            <Icon icon="check" className={styles.check} size={20} />
            <Icon icon="cross" className={styles.cross} size={20} />
          </>
        )}
      </>
    );
  }, [description, emoji, icon, isSelected, label, options, selectedKeys]);

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
        <Dropdown onOpenChange={setIsDropdownOpen}>
          <DropdownTrigger>
            <button type="button" className={classNames} onClick={onClick}>
              {menuItemContent}
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label={label}
            variant="flat"
            className="max-h-96 overflow-auto"
            selectionMode={selectionMode}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectChange}
          >
            {options.map((option) => (
              <DropdownItem key={option.value}>{option.label}</DropdownItem>
            ))}
          </DropdownMenu>
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
      <NextLink href={href} className={classNames} onClick={onClick} {...cancelListeners}>
        {menuItemContent}
      </NextLink>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onClick} {...cancelListeners}>
      {menuItemContent}
    </button>
  );
};
