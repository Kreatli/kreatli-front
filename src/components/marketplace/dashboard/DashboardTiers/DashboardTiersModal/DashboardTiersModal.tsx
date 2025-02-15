import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useTiersModal } from '../../../../../hooks/marketplace/useTiersModal';
import { useBreakpointValue } from '../../../../../hooks/useBreakpointValue';
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
      scrollBehavior="inside"
      className="w-full max-h-full max-w-screen-xl"
      classNames={{
        closeButton: 'z-10',
      }}
      size={screenWidth !== 'desktop' ? 'full' : undefined}
      backdrop="blur"
      onClose={closeModal}
    >
      <ModalContent>
        <ModalBody className="py-8">
          <div className="flex flex-col gap-5 flex-none md:flex-row">
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="flat" color="secondary" as={NextLink} href="/marketplace/dashboard" onClick={closeModal}>
            Go to dashboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
