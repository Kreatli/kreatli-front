import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { useNotifications } from 'hooks/useNotifications';
import React from 'react';
import { useMutation } from 'react-query';
import { requestJobApplicationAccept, requestJobApplicationReject } from 'services/job';
import { Common } from 'typings/common';
import { getErrorMessage } from 'utils/getErrorMessage';

interface Props {
  jobOfferId: Common.Id;
  jobApplicationId: Common.Id;
  onReject?: () => void;
  onHire?: () => void;
}

export const JobApplicationButtons = ({ jobOfferId, jobApplicationId, onHire, onReject }: Props) => {
  const [isRejectConfirmationOpen, setIsRejectConfirmationOpen] = React.useState(false);
  const [isAcceptConfirmationOpen, setIsAcceptConfirmationOpen] = React.useState(false);
  const { pushNotification } = useNotifications();

  const { isLoading: isRejecting, mutate: mutateReject } = useMutation(requestJobApplicationReject, {
    onSuccess: () => {
      setIsRejectConfirmationOpen(false);
      pushNotification({
        message: 'The application was successfully rejected',
        color: 'success',
        icon: 'success',
      });
      onReject?.();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const { isLoading: isAccepting, mutate: mutateAccept } = useMutation(requestJobApplicationAccept, {
    onSuccess: () => {
      setIsAcceptConfirmationOpen(false);
      pushNotification({
        message: 'The professional was successfully hired',
        color: 'success',
        icon: 'success',
      });
      onHire?.();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleReject = () => {
    mutateReject([jobOfferId, jobApplicationId]);
  };

  const handleAccept = () => {
    mutateAccept([jobOfferId, jobApplicationId]);
  };

  return (
    <>
      <Popover isOpen={isRejectConfirmationOpen} onOpenChange={setIsRejectConfirmationOpen}>
        <PopoverTrigger>
          <Button color="secondary" size="sm" radius="lg" variant="flat" startContent={<Icon icon="crossCircle" size={18} />}>
            Reject
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-2">
            <p>Are you sure you want to reject this application?</p>
            <div className="flex gap-2 mt-2">
              <Button isDisabled={isRejecting} size="sm" variant="light" onClick={() => setIsRejectConfirmationOpen(false)}>Cancel</Button>
              <Button isLoading={isRejecting} size="sm" variant="flat" color="danger" onClick={handleReject}>Reject</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Popover isOpen={isAcceptConfirmationOpen} onOpenChange={setIsAcceptConfirmationOpen}>
        <PopoverTrigger>
          <Button color="secondary" size="sm" radius="lg" startContent={<Icon icon="checkCircle" size={18} />}>
            Hire
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-2">
            <p>Are you sure you want to hire this professional?</p>
            <div className="flex gap-2 mt-2">
              <Button isDisabled={isAccepting} size="sm" variant="light" onClick={() => setIsAcceptConfirmationOpen(false)}>Cancel</Button>
              <Button isLoading={isAccepting} size="sm" variant="flat" color="success" onClick={handleAccept}>Hire</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
