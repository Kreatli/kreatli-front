import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const TextLinear = ({ children }: Props) => {
  return <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-secondary">{children}</span>;
};
