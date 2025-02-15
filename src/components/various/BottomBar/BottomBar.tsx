import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const BottomBar = ({ children, className }: Props) => {
  return (
    <div
      // eslint-disable-next-line max-len
      className={`${className} sticky inset-0 py-4 px-6 -mx-6 -mb-8 my-8 bg-background/70 backdrop-blur-lg shadow-medium z-30`}
    >
      {children}
    </div>
  );
};
