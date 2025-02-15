import cx from 'classnames';
import React from 'react';

import { Icon } from '../Icon';
import styles from './Rating.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
}

export const Rating = React.forwardRef<HTMLInputElement, Props>(({ invalid, onChange, label, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    onChange?.(event);
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-foreground-500">{label}</span>}
      <div className={`${styles.stars} flex-initial`}>
        {Array.from(Array(5)).map((_, index) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            key={index}
            className={cx(styles.star, {
              [styles.checked]: value === 5 - index,
              [styles.invalid]: invalid,
              [styles.readOnly]: props.readOnly,
            })}
          >
            <input
              ref={ref}
              type="radio"
              className={styles.input}
              value={5 - index}
              {...props}
              onChange={handleChange}
            />
            <Icon icon="star" size="1.25rem" className={styles.icon} />
          </label>
        ))}
      </div>
    </div>
  );
});
