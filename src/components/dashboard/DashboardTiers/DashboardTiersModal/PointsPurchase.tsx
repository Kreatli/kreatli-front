import { Card, CardBody } from '@nextui-org/react';
import React from 'react';

export const PointsPurchase = () => {
  return (
    <Card className="flex-1">
      <CardBody>
        <h3 className="text-medium font-semibold mb-4">Points purchase</h3>
        <ul className="text-sm list-disc pl-4 marker:text-secondary text-default-500">
          <li>Purchase points to complement your efforts and accelerate your progress</li>
          <li>Buying points ignores the daily points limit so you won&apos;t lose any purchased points</li>
        </ul>
      </CardBody>
    </Card>
  );
};
