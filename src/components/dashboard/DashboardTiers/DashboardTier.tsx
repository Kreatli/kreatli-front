import { TierImage } from 'components/various/TierImage';
import { TIER_COLORS, TIER_FEATURES, TIER_LABELS } from 'constants/tier';
import React from 'react';

interface Props {
  tier: number;
  label: string;
}

export const DashboardTier = ({ tier, label }: Props) => {
  const tierColor = TIER_COLORS[tier];
  const tierFeatures = TIER_FEATURES[tier];

  const tierLabel = (
    <div className="font-semibold">{label}: <span className={`text-${tierColor}-500`}>{TIER_LABELS[tier]}</span></div>
  );

  return (
    <div className="flex max-sm:flex-col">
      <div className="max-sm:flex items-center">
        <TierImage tier={tier} className="w-14 h-14 sm:w-20 sm:h-20" />
        <span className="sm:hidden">{tierLabel}</span>
      </div>
      <div className="flex-1">
        <span className="max-sm:hidden">{tierLabel}</span>
        <ul className={`list-disc pl-5 marker:text-${tierColor}-500`}>
          {tierFeatures.map((feature, index) => (
            <li key={index}>
              <span className="text-default-500 text-[0.8125rem]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
