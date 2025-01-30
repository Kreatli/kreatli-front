import React from 'react';

import IphoneFrameImage from '../../../../assets/images/iphone-frame.svg';

interface Props {
  children: React.ReactNode;
}

export const MobileFrame = ({ children }: Props) => {
  return (
    <div className="relative w-max p-2">
      <div className="absolute inset-0">
        <IphoneFrameImage viewBox="0 0 256 516" className="w-full h-full" />
      </div>
      {children}
    </div>
  );
};
