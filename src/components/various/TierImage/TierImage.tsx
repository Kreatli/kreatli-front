import { TIERS } from 'constants/tier';
import { useTiersModal } from 'hooks/useTiersModal';
import React from 'react';

import Tier1Image from '../../../assets/images/tiers/tier-1.svg';
import Tier2Image from '../../../assets/images/tiers/tier-2.svg';
import Tier3Image from '../../../assets/images/tiers/tier-3.svg';
import Tier4Image from '../../../assets/images/tiers/tier-4.svg';
import Tier5Image from '../../../assets/images/tiers/tier-5.svg';

interface Props {
  tier: number;
  className?: string;
}

const IMAGES_BY_TIER = {
  [TIERS.NOVICE]: Tier1Image,
  [TIERS.ENTHUSIAST]: Tier2Image,
  [TIERS.INNOVATOR]: Tier3Image,
  [TIERS.EXPERT]: Tier4Image,
  [TIERS.LEGEND]: Tier5Image,
} as Record<number, React.FC<React.SVGProps<SVGElement>>>;

export const TierImage = ({ tier, className }: Props) => {
  const Image = IMAGES_BY_TIER[tier];
  const { openModal } = useTiersModal();

  return (
    <button type="button" aria-label="Show tiers explanation modal" onClick={openModal}>
      <Image className={className} viewBox="0 0 100 100" />
    </button>
  );
};
