import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestUserInvitationAccept, requestUserInvitationReject } from '../services/user';
import { Common } from '../typings/common';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useNotifications } from './useNotifications';
import { useSession } from './useSession';

interface Props {
  invitationId: Common.MaybeId;
  userId: Common.MaybeId;
}

export const useUserInvitation = ({ invitationId, userId }: Props) => {
  const { currentUserId } = useSession();
  const queryClient = useQueryClient();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const onError = (error: any) => {
    pushNotification({
      message: getErrorMessage(error),
      color: 'danger',
      icon: 'error',
    });
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['user', userId] });
    queryClient.invalidateQueries({ queryKey: ['user', currentUserId, 'connections'] });
  };

  const { mutate: mutateAccept, isPending: isLoadingAccept } = useMutation({
    mutationFn: requestUserInvitationAccept,
    onSuccess,
    onError,
  });

  const { mutate: mutateReject, isPending: isLoadingReject } = useMutation({
    mutationFn: requestUserInvitationReject,
    onSuccess,
    onError,
  });

  const handleAccept = () => {
    if (currentUserId) {
      mutateAccept([currentUserId, { invitationId }]);
    }
  };

  const handleReject = () => {
    if (currentUserId) {
      mutateReject([currentUserId, { invitationId }]);
    }
  };

  const isLoading = isLoadingAccept || isLoadingReject;

  return {
    isLoading,
    handleAccept,
    handleReject,
  };
};
