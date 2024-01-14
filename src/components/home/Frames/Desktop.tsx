import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const DesktopFrame = ({ children }: Props) => {
  return (
    <div className="shadow-large rounded-md rounded-t-large overflow-hidden">
      <div className="flex gap-1.5 bg-secondary-800 px-4 py-3">
        <div className="w-2.5 h-2.5 bg-danger rounded-full" />
        <div className="w-2.5 h-2.5 bg-warning rounded-full" />
        <div className="w-2.5 h-2.5 bg-success rounded-full" />
      </div>
      <div className="overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};
