import React from 'react';

import { TIER_LABELS, TIER_POINTS, TIER_STRUCTURES } from '../../../../../constants/marketplace/tier';
import { TierImage } from '../../../../various/TierImage';

interface Props {
  tier: number;
}

export const TierStructureItem = ({ tier }: Props) => {
  const minValue = TIER_POINTS[tier];
  const maxValue = TIER_POINTS[tier + 1] - 1;

  const pointsFormatter = new Intl.NumberFormat('fr');

  return (
    <div>
      <div className="flex items-center gap-2">
        <TierImage tier={tier} className="w-9 h-9" />
        <h4 className="text-sm font-semibold whitespace-nowrap">
          Tier {tier}: {TIER_LABELS[tier]}
        </h4>
        <div className="text-xs font-semibold text-secondary whitespace-nowrap">
          {maxValue
            ? `${pointsFormatter.format(minValue)} - ${pointsFormatter.format(maxValue)} points`
            : `${pointsFormatter.format(minValue)}+ points`}
        </div>
      </div>
      <p className="text-sm text-default-500">{TIER_STRUCTURES[tier]}</p>
    </div>
  );
};
