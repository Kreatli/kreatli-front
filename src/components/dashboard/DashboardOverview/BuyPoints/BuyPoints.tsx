import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';

import { BuyPointsModal } from './BuyPointsModal';

export const BuyPoints = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <Card className="flex-1">
        <CardBody className="p-5 gap-4">
          <div className="text-sm font-semibold text-center">
            Want to reach the next tier faster?
          </div>
          <div className="flex flex-col items-center gap-1 w-full">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              className="font-semibold text-sm"
              fullWidth
              onClick={() => setIsModalOpen(true)}
            >
              Buy points
            </Button>
            <div className="text-sm text-default-400">Secure payment</div>
          </div>
        </CardBody>
      </Card>
      <BuyPointsModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
