import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { requestLeaderboardUsers } from '../../../services/leaderboard';
import { DashboardLeaderBoardItem } from './DashboardLeaderBoardItem';
import { DashboardLeaderBoardSkeleton } from './DashboardLeaderBoardSkeleton';

interface Props {
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardLeaderBoard = ({ maxHeight, minHeight }: Props) => {
  const { data: users = [], isFetching } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: requestLeaderboardUsers,
  });

  const shouldShowSkeleton = (users.length === 0) && isFetching;

  return (
    <Card className="flex-1" style={{ maxHeight, minHeight }}>
      <CardHeader className="p-5 pb-2">
        <div className="text-medium font-semibold">Leaderboard</div>
      </CardHeader>
      <CardBody className="p-5 pt-2">
        <div className="flex flex-col gap-3">
          {shouldShowSkeleton && (
            <DashboardLeaderBoardSkeleton />
          )}
          {!shouldShowSkeleton && (
            <>
              {users.map((user, index) => (
                <React.Fragment key={user._id}>
                  {index !== 0 && <Divider className="bg-default-100" />}
                  <DashboardLeaderBoardItem user={user} points={user.tierPoints} place={index + 1} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
