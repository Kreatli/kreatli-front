import { Avatar, Card, CardBody, Divider, Progress } from '@nextui-org/react';
import { TierImage } from 'components/various/TierImage';
import { TIER_COLORS, TIER_LABELS } from 'constants/tier';
import { useSession } from 'hooks/useSession';
import React from 'react';

const CURRENT_USER_POINTS = 1200;
const CURRENT_TIER_POINTS = 0;
const NEXT_TIER_POINTS = 2000;
const CURRENT_USER_CURRENT_TIER = 1;

export const Overview = () => {
  const { currentUser } = useSession();

  return (
    <Card>
      <CardBody className="gap-5">
        <div className="flex items-center gap-3">
          <Avatar src={currentUser?.avatarUrl} className="w-12 h-12" />
          <div>
            <div className="text-medium font-bold">{currentUser?.name}</div>
            <div className="text-small text-default-400">Progress: {(CURRENT_USER_POINTS / NEXT_TIER_POINTS) * 100}%</div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-small mb-1">
            <div className="text-default-400">Earned: <span className="text-foreground font-semibold">{CURRENT_USER_POINTS}</span></div>
            <div className="text-default-400">For the next tier: <span className="text-foreground font-semibold">{NEXT_TIER_POINTS}</span></div>
          </div>
          <Progress
            size="md"
            color="success"
            minValue={CURRENT_TIER_POINTS}
            maxValue={NEXT_TIER_POINTS}
            value={CURRENT_USER_POINTS}
          />
        </div>
        <div className="flex gap-2 text-sm">
          <div className="flex-1 flex items-center gap-1">
            <span className="text-default-400">Current:</span>
            <span className={`flex items-center text-${TIER_COLORS[CURRENT_USER_CURRENT_TIER]}-500 font-semibold`}>
              <TierImage tier={CURRENT_USER_CURRENT_TIER} className="w-9 h-9" />
              {TIER_LABELS[CURRENT_USER_CURRENT_TIER]}
            </span>
          </div>
          <Divider orientation="vertical" />
          <div className="flex-1 flex items-center justify-end gap-1">
            <span className="text-default-400">Next:</span>
            <span className={`flex items-center text-${TIER_COLORS[CURRENT_USER_CURRENT_TIER + 1]}-500 font-semibold`}>
              <TierImage tier={CURRENT_USER_CURRENT_TIER + 1} className="w-9 h-9" />
              {TIER_LABELS[CURRENT_USER_CURRENT_TIER + 1]}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
