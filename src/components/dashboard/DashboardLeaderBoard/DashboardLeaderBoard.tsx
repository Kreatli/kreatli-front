import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react';

import { DashboardLeaderBoardItem } from './DashboardLeaderBoardItem';

const LEADER_BOARD = [
  {
    user: {
      _id: '001',
      name: 'Kathryn Murphy',
      avatarUrl: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
    },
    points: 11340,
  },
  {
    user: {
      _id: '002',
      name: 'Bessie Cooper',
      avatarUrl: 'https://media.istockphoto.com/id/1224956842/photo/portarit-of-a-handsome-older-man-drinking-coffee.jpg?s=612x612&w=0&k=20&c=k5zK_TZwGBfXXfnx6oFT4vgG45dxAqRln6hAy4IyxAw=',
    },
    points: 10114,
  },
  {
    user: {
      _id: '003',
      name: 'Albert Flores',
      avatarUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_640.jpg',
    },
    points: 9754,
  },
  {
    user: {
      _id: '004',
      name: 'Ralph Edwards',
      avatarUrl: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1698883200&semt=ais',
    },
    points: 9322,
  },
  {
    user: {
      _id: '005',
      name: 'Esther Howard',
      avatarUrl: 'https://img.freepik.com/free-photo/confident-good-looking-beautiful-woman-with-blonde-dyed-hair-dressed-casual-clothes-looking-seriously_176420-15186.jpg',
    },
    points: 9004,
  },
  {
    user: {
      _id: '006',
      name: 'Kathryn Murphy',
      avatarUrl: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
    },
    points: 11340,
  },
  {
    user: {
      _id: '007',
      name: 'Bessie Cooper',
      avatarUrl: 'https://media.istockphoto.com/id/1224956842/photo/portarit-of-a-handsome-older-man-drinking-coffee.jpg?s=612x612&w=0&k=20&c=k5zK_TZwGBfXXfnx6oFT4vgG45dxAqRln6hAy4IyxAw=',
    },
    points: 10114,
  },
  {
    user: {
      _id: '008',
      name: 'Albert Flores',
      avatarUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_640.jpg',
    },
    points: 9754,
  },
  {
    user: {
      _id: '009',
      name: 'Ralph Edwards',
      avatarUrl: 'https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1698883200&semt=ais',
    },
    points: 9322,
  },
  {
    user: {
      _id: '010',
      name: 'Esther Howard',
      avatarUrl: 'https://img.freepik.com/free-photo/confident-good-looking-beautiful-woman-with-blonde-dyed-hair-dressed-casual-clothes-looking-seriously_176420-15186.jpg',
    },
    points: 9004,
  },
];

interface Props {
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardLeaderBoard = ({ maxHeight, minHeight }: Props) => {
  return (
    <Card className="flex-1" style={{ maxHeight, minHeight }}>
      <CardHeader className="p-5 pb-2">
        <div className="text-medium font-semibold">Leaderboard</div>
      </CardHeader>
      <CardBody className="pt-2">
        <div className="flex flex-col gap-3">
          {LEADER_BOARD.map(({ user, points }, index) => (
            <React.Fragment key={user._id}>
              {index !== 0 && <Divider className="bg-default-100" />}
              {/* TODO: remove ts ignore when types are defined */}
              {/* @ts-ignore */}
              <DashboardLeaderBoardItem user={user} points={points} place={index + 1} />
            </React.Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
