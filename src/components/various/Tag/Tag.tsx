import cx from 'classnames';
import React from 'react';

import styles from './Tag.module.scss';
import { TagGroup, TagGroupContext } from './TagGroup';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: 'error';
  children: React.ReactNode;
}

export const Tag = ({ checked = false, value, status, children, onChange, ...inputProps }: Props) => {
  const [isChecked, setIsChecked] = React.useState(checked);
  const { toggleTag } = React.useContext(TagGroupContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    onChange?.(event);
    toggleTag(value);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cx(styles.tag, { [styles.checked]: isChecked, [styles.error]: status === 'error' })}>
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
