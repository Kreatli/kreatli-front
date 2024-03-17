import { Button, Card, CardBody } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { requestBuyPoints } from '../../../../services/dashboard';
import { Icon } from '../../../various/Icon';

interface Props {
  pointsAmount: number;
  price: number;
}

export const BuyPointsCard = ({ pointsAmount, price }: Props) => {
  const pointsFormatter = new Intl.NumberFormat('fr');
  const priceFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  const { mutate, isPending } = useMutation({
    mutationFn: () => requestBuyPoints({ points: pointsAmount }),
    onSuccess: ({ paymentLink }) => {
      window.location.href = paymentLink;
    },
  });

  const handleBuyPoints = () => {
    mutate();
  };

  return (
    <Card>
      <CardBody className="items-center p-4">
        <div className="bg-secondary-50 text-secondary rounded-large p-2 mb-2">
          <Icon icon="coin" />
        </div>
        <div className="text-sm font-semibold mb-2">{pointsFormatter.format(pointsAmount)} Points</div>
        <div className="text-success font-semibold mb-2">{priceFormatter.format(price)}</div>
        <Button size="sm" color="secondary" isLoading={isPending} className="text-sm font-semibold" onClick={handleBuyPoints}>Buy</Button>
      </CardBody>
    </Card>
  );
};
