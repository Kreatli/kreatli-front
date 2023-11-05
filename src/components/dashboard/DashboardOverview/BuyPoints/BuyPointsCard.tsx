import { Button, Card, CardBody } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import React from 'react';

interface Props {
  pointsAmount: number;
  price: number;
}

export const BuyPointsCard = ({ pointsAmount, price }: Props) => {
  const pointsFormatter = new Intl.NumberFormat('fr');
  const priceFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  return (
    <Card>
      <CardBody className="items-center p-4">
        <div className="bg-secondary-50 text-secondary rounded-large p-2 mb-2">
          <Icon icon="coin" />
        </div>
        <div className="text-sm font-semibold mb-2">{pointsFormatter.format(pointsAmount)} Points</div>
        <div className="text-success font-semibold mb-2">{priceFormatter.format(price)}</div>
        <Button size="sm" color="secondary" className="text-sm font-semibold">Buy</Button>
      </CardBody>
    </Card>
  );
};
