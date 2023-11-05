import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { BuyPointsCard } from './BuyPointsCard';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const POINTS_PLANS = [
  {
    pointsAmount: 100,
    price: 5,
  },
  {
    pointsAmount: 500,
    price: 20,
  },
  {
    pointsAmount: 1000,
    price: 35,
  },
  {
    pointsAmount: 5000,
    price: 150,
  },
  {
    pointsAmount: 10000,
    price: 275,
  },
];

export const BuyPointsModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      backdrop="blur"
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader>
          Want to reach the next tier faster?
        </ModalHeader>
        <ModalBody className="grid grid-cols-2 sm:grid-cols-none sm:grid-flow-col sm:auto-cols-fr gap-4">
          {POINTS_PLANS.map((plan) => (
            <BuyPointsCard key={plan.pointsAmount} {...plan} />
          ))}
        </ModalBody>
        <Divider className="mt-10" />
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="flat" color="secondary" onClick={() => onOpenChange(false)}>
            Go to dashboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
