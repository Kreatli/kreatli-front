import { Avatar, Card, CardBody, Divider, Progress } from '@nextui-org/react';
import { TierImage } from 'components/various/TierImage';
import { TIER_COLORS, TIER_LABELS, TIER_POINTS } from 'constants/tier';
import { DashboardContext } from 'contexts/Dashboard';
import { useSession } from 'hooks/useSession';
import React from 'react';

export const Overview = () => {
  const { currentUser } = useSession();
  const { earnedTomorrow, userPoints, userTier } = React.useContext(DashboardContext);

  const isLastTier = userTier > 4;
  const currentTierPoints = TIER_POINTS[userTier];
  const nextTierPoints = !isLastTier ? TIER_POINTS[userTier + 1] : Infinity;

  const progressValue = React.useMemo(() => {
    return Math.round(((userPoints - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100);
  }, [currentTierPoints, nextTierPoints, userPoints]);

  const earnedPoints = earnedTomorrow > 0
    ? <>{userPoints - earnedTomorrow} <span className="text-warning">(+{earnedTomorrow})</span></>
    : userPoints;

  return (
    <Card>
      <CardBody className="p-5 gap-5">
        <div className="flex items-center gap-3">
          <Avatar src={currentUser?.avatarUrl} className="w-12 h-12" />
          <div>
            <div className="text-medium font-bold">{currentUser?.name}</div>
            {!isLastTier && (
              <div className="text-small text-default-400">Progress: {progressValue}%</div>
            )}
          </div>
        </div>
        <div>
          {isLastTier ? (
            <div className="text-small text-default-400 mb-1">Earned points: <span className="text-foreground font-semibold">{userPoints}</span></div>
          ) : (
            <>
              <div className="flex justify-between text-small mb-1">
                <div className="text-default-400">Earned: <span className="text-foreground font-semibold">{earnedPoints}</span></div>
                <div className="text-default-400">For the next tier: <span className="text-foreground font-semibold">{nextTierPoints}</span></div>
              </div>
              <Progress
                size="md"
                color="success"
                minValue={currentTierPoints}
                maxValue={nextTierPoints}
                value={userPoints}
              />
            </>
          )}
        </div>
        <div className="flex gap-2 text-sm">
          <div className="flex-1 flex items-center gap-1">
            <span className="text-default-400">Current:</span>
            <span className={`flex items-center text-${TIER_COLORS[userTier]}-500 font-semibold`}>
              <TierImage tier={userTier} className="w-9 h-9" />
              {TIER_LABELS[userTier]}
            </span>
          </div>
          {!isLastTier && (
            <>
              <Divider orientation="vertical" />
              <div className="flex-1 flex items-center justify-end gap-1">
                <span className="text-default-400">Next:</span>
                <span
                  className={`flex items-center text-${TIER_COLORS[userTier + 1]}-500 font-semibold`}
                >
                  <TierImage tier={userTier + 1} className="w-9 h-9" />
                  {TIER_LABELS[userTier + 1]}
                </span>
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
