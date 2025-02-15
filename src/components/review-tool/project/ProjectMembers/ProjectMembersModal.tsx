import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useSession } from '../../../../hooks/review-tool/useSession';
import { useNotifications } from '../../../../hooks/useNotifications';
import { useDeleteProjectIdMemberMemberId, usePostProjectIdMember } from '../../../../services/review-tool/hooks';
import { getProjectId, getProjects } from '../../../../services/review-tool/services';
import { ProjectDto, ProjectMemberDto } from '../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../utils/review-tool/getErrorMessage';
import { InviteProjectMemberForm } from './InviteProjectMemberForm';
import { ProjectMembersTable } from './ProjectMembersTable';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectMembersModal = ({ project, isOpen, onClose }: Props) => {
  const { mutate: deleteProjectMember, isPending: isRemoving } = useDeleteProjectIdMemberMemberId();
  const { mutate: resendInvitation, isPending: isResendingInvitation } = usePostProjectIdMember();

  const { user } = useSession();
  const isProjectOwner = project?.createdBy?.id === user?.id;
  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();

  const handleRemove = (member: ProjectMemberDto) => {
    if (!project) {
      return;
    }

    deleteProjectMember(
      { id: project.id, memberId: member.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          pushNotification({ icon: 'success', color: 'success', message: 'The member was removed' });
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  const handleResetInvite = (member: ProjectMemberDto) => {
    if (!project) {
      return;
    }

    resendInvitation(
      { id: project.id, requestBody: { email: member.email, role: 'contributor' } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, project.id] });
          pushNotification({ icon: 'success', color: 'success', message: 'The invitation was resent' });
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Project members</ModalHeader>
        <ModalBody className="pb-6">
          {project && (
            <div className="flex flex-col gap-8">
              <ProjectMembersTable
                members={project.members}
                isEditable={isProjectOwner}
                isLoading={isRemoving || isResendingInvitation}
                onRemove={handleRemove}
                onResendInvite={handleResetInvite}
              />
              {isProjectOwner && <InviteProjectMemberForm project={project} onCancel={onClose} />}
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
