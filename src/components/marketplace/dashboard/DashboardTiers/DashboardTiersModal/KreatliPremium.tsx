/* eslint-disable max-len */
import { Card, CardBody, Tooltip } from '@heroui/react';
import React from 'react';

import { Icon } from '../../../../various/Icon';

export const KreatliPremium = () => {
  return (
    <Card>
      <CardBody className="p-5">
        <div className="flex gap-1 items-center mb-4">
          <h3 className="text-medium font-semibold">Kreatli premium</h3>
          <Tooltip content="Kreatli Premium is going to be available in the next product update soon">
            <button type="button" aria-label="Show Kreatli premium tooltip" className="text-default-400">
              <Icon icon="helpCircle" size={16} />
            </button>
          </Tooltip>
        </div>
        <p className="text-sm text-default-500">
          Elevate your Kreatli journey with our premium subscription and point purchase options, designed to provide you
          with more opportunities, rewards, and growth.
        </p>
        <ul className="text-sm list-disc pl-4 mt-2 marker:text-secondary text-default-500">
          <li>
            <span className="font-semibold">Increased limit:</span> Enjoy an increased daily limit of 500 points
          </li>
          <li>
            <span className="font-semibold">Boosted Points:</span> 50% bonus on points earned from all tasks
          </li>
          <li>
            <span className="font-semibold">Unlock Expert and Legend Tiers:</span> Get access to the &quot;Expert&quot;
            and &quot;Legend&quot; tiers to enjoy their unique benefits
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};
