import React from 'react';

import { BuyPoints } from './BuyPoints';
import { EarnedToday } from './EarnedToday';
import { Overview } from './Overview';

export const DashboardOverview = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="flex flex-col gap-5">
      <Overview />
      <div className="flex gap-5">
        <EarnedToday />
        <BuyPoints />
      </div>
    </div>
  );
});
