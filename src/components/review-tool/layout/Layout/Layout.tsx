import React from 'react';

import { ReviewToolLoader } from '../ReviewToolLoader';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return <ReviewToolLoader>{children}</ReviewToolLoader>;
};
