import { Card, CardBody } from '@heroui/react';
import React from 'react';

import { TIER_OPTIONS } from '../../../../../constants/marketplace/tier';
import { TierStructureItem } from './TierStructureItem';

export const TierStructure = () => {
  return (
    <Card className="md:flex-[3]">
      <CardBody className="p-5">
        <h3 className="text-medium font-semibold mb-4">Tier Structure</h3>
        <div className="flex flex-col gap-4">
          {TIER_OPTIONS.map(({ value }) => (
            <TierStructureItem key={value} tier={parseInt(value, 10)} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
