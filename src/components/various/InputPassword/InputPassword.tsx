import { Input, InputProps } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../Icon';

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      ref={ref}
      type={isVisible ? 'text' : 'password'}
      endContent={(
        <button type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <Icon icon="show" size={16} />
          ) : (
            <Icon icon="hide" size={16} />
          )}
        </button>
      )}
      {...props}
    />
  );
});
