import { Button, Card, CardBody } from '@heroui/react';
import { sendGTMEvent } from '@next/third-parties/google';
import React from 'react';

import { useSession } from '../../../../../hooks/marketplace/useSession';
import { BuyPointsModal } from './BuyPointsModal';

export const BuyPoints = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { currentUserId } = useSession();

  const handleClick = () => {
    setIsModalOpen(true);

    sendGTMEvent({
      event: 'buy-points-modal-opened',
      userId: currentUserId,
    });
  };

  return (
    <>
      <Card className="flex-1">
        <CardBody className="p-5 gap-4">
          <div className="text-sm font-semibold text-center">Want to reach the next tier faster?</div>
          <div className="flex flex-col items-center gap-1 w-full">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              className="font-semibold text-sm"
              fullWidth
              onClick={handleClick}
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
