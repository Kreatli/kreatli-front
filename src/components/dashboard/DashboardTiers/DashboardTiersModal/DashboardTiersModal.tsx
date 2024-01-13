import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useTiersModal } from '../../../../hooks/useTiersModal';
import { EarningPoints } from './EarningPoints';
import { KreatliPremium } from './KreatliPremium';
import { PointsPurchase } from './PointsPurchase';
import { TierLegend } from './TierLegend';
import { TierStructure } from './TierStructure';

export const DashboardTiersModal = () => {
  const { isOpen, closeModal } = useTiersModal();
  const screenWidth = useBreakpointValue({ XL: 'desktop' }, 'mobile');

  return (
    <Modal
      isOpen={isOpen}
      className="w-full max-h-full overflow-y-auto max-w-screen-xl"
      size={screenWidth !== 'desktop' ? 'full' : undefined}
      backdrop="blur"
      onClose={closeModal}
    >
      <ModalContent>
        <ModalHeader />
        <ModalBody className="flex-none md:flex-row gap-5">
          <TierStructure />
          <div className="md:flex-[4] lg:flex-[7] flex flex-col gap-5">
            <div className="flex flex-col lg:flex-row gap-5">
              <EarningPoints />
              <div className="flex flex-col gap-5">
                <KreatliPremium />
                <PointsPurchase />
              </div>
            </div>
            <TierLegend />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={closeModal}>Close</Button>
          <Button variant="flat" color="secondary" as={NextLink} href="/dashboard" onClick={closeModal}>Go to dashboard</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
