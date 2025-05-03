import { addToast, Avatar, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@heroui/react';
import React from 'react';

import { useSession } from '../../../../../hooks/review-tool/useSession';
import { usePutProjectIdFileFileId } from '../../../../../services/review-tool/hooks';
import { ProjectFileDto, ProjectMemberDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { getProjectMemberLetter } from '../../../../../utils/review-tool/shortNames';
import { Icon } from '../../../../various/Icon';

interface Props {
  projectId: string;
  file: ProjectFileDto;
  members: ProjectMemberDto[];
  isDisabled?: boolean;
}

export const ProjectFileAssignee = ({ projectId, file, members, isDisabled }: Props) => {
  const [assigneeId, setAssigneeId] = React.useState<string | null>(file.assignee?.id ?? null);

  const { user } = useSession();
  const memberRole = members?.find((member) => member.user?.id === user?.id)?.role;
  const isEditable = memberRole === 'owner';

  const { assignee } = file;

  const { mutate } = usePutProjectIdFileFileId();

  React.useEffect(() => {
    setAssigneeId(assignee?.id ?? null);
  }, [assignee]);

  const handleSelectionChange = (keys: Selection) => {
    if (keys !== 'all') {
      const newAssigneeId = keys.values().next().value ?? null;

      setAssigneeId(newAssigneeId as string | null);
      mutate(
        {
          id: projectId,
          fileId: file.id,
          requestBody: { assigneeId: newAssigneeId as string | undefined },
        },
        {
          onSuccess: ({ file: updatedFile }) => {
            setAssigneeId(updatedFile?.assignee?.id ?? null);
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
          },
        },
      );
    }
  };

  const selectedMember = members.find((member) => member.user?.id === assigneeId);

  const avatar = (
    <Avatar
      as="button"
      src={selectedMember?.user?.avatar?.url ?? ''}
      size="sm"
      isBordered
      isDisabled={isDisabled}
      className={cn({ 'cursor-default': !isEditable })}
      fallback={
        selectedMember ? (
          <div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(selectedMember)}</div>
        ) : (
          <Icon icon="user" size={16} />
        )
      }
    />
  );

  if (!isEditable) {
    return avatar;
  }

  return (
    <Dropdown placement="bottom-start" offset={10}>
      <DropdownTrigger>{avatar}</DropdownTrigger>
      <DropdownMenu
        variant="flat"
        className="max-h-64 overflow-y-scroll"
        selectionMode="single"
        selectedKeys={assigneeId ? [assigneeId] : []}
        onSelectionChange={handleSelectionChange}
      >
        {members
          .filter((member) => member.user)
          .filter((member) => member.status === 'joined')
          .map((member) => (
            <DropdownItem key={member.user?.id ?? member.id}>
              <div className="flex items-center gap-3">
                <Avatar
                  size="sm"
                  src={member.user?.avatar?.url ?? ''}
                  fallback={
                    <div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(member)}</div>
                  }
                />
                <div>
                  <div className="text-small">{member.user?.name}</div>
                  <div className="text-foreground-500 text-tiny">{member.user?.email}</div>
                </div>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
