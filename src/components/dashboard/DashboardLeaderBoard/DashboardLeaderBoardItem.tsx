import { Avatar } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';
import { User } from 'typings/user';

import BronzeMedalImage from '../../../assets/images/medals/bronze.svg';
import GoldMedalImage from '../../../assets/images/medals/gold.svg';
import SilverMedalImage from '../../../assets/images/medals/silver.svg';

interface Props {
  user: User.ShortInfo;
  points: number;
  place: number;
}

const MEDAL_IMAGES_BY_PLACE = {
  1: GoldMedalImage,
  2: SilverMedalImage,
  3: BronzeMedalImage,
} as Record<number, React.FC<React.SVGProps<SVGElement>> | undefined>;

export const DashboardLeaderBoardItem = ({ user, points, place }: Props) => {
  const Image = MEDAL_IMAGES_BY_PLACE[place];
  const pointsFormatter = new Intl.NumberFormat('fr');

  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-5 h-5">
        <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-semibold text-default-600 ${Image ? 'text-white text-[0.625rem]' : 'text-sm'}`}>{place}</div>
        {Image && <Image className="w-5 h-5" viewBox="0 0 24 24" />}
      </div>
      <NextLink href={`/profile/${user._id}`} className="flex-1 flex gap-3">
        <Avatar src={user.avatarUrl} className="w-9 h-9" />
        <div>
          <div className="text-xs text-default-400">Name</div>
          <div className="text-sm font-semibold">{user.name}</div>
        </div>
      </NextLink>
      <div>
        <div className="text-xs text-default-400">Score</div>
        <div className="text-sm font-semibold">{pointsFormatter.format(points)}</div>
      </div>
    </div>
  );
};
