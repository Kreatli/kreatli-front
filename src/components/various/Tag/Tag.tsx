import cx from 'classnames';
import React from 'react';

import styles from './Tag.module.scss';
import { TagGroup, TagGroupContext } from './TagGroup';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: 'danger';
  children: React.ReactNode;
}

export const Tag = ({ value, status, children, onChange, ...inputProps }: Props) => {
  const { checkedTags, toggleTag } = React.useContext(TagGroupContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    toggleTag(value);
  };

  const isChecked = checkedTags.includes(value as string);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cx(styles.tag, { [styles.checked]: isChecked, [styles.danger]: status === 'danger' })}>
      <input
        {...inputProps}
        type="checkbox"
        value={value}
        checked={isChecked}
        className={styles.input}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

Tag.Group = TagGroup;
