import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../../../hooks/review-tool/useSession';
import { usePutProjectIdFileFileId } from '../../../../../services/review-tool/hooks';
import { ProjectFileDto, ProjectMemberDto } from '../../../../../services/review-tool/types';

interface Props {
  projectId: string;
  file: ProjectFileDto;
  memberRole?: ProjectMemberDto['role'];
}

export const STATUS_LABEL = {
  none: 'No status',
  'in-progress': 'In progress',
  'changes-required': 'Changes required',
  'review-needed': 'Review needed',
  approved: 'Approved',
} as Record<string, string>;

const STATUS_COLOR = {
  none: 'default',
  'in-progress': 'primary',
  'changes-required': 'danger',
  'review-needed': 'warning',
  approved: 'success',
} as Record<string, 'default' | 'primary' | 'danger' | 'warning' | 'success'>;

export const ProjectFileStatus = ({ file, projectId, memberRole }: Props) => {
  const { status } = file;
  const { user } = useSession();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([status ?? 'none']));

  const isEditable = React.useMemo(() => {
    if (memberRole === 'owner') {
      return true;
    }

    return user?.id === file.createdBy?.id || user?.id === file.assignee?.id;
  }, [file, memberRole, user]);

  React.useEffect(() => {
    setSelectedKeys(new Set([status ?? 'none']));
  }, [status]);

  const { mutate } = usePutProjectIdFileFileId();

  const handleSelectionChange = (keys: Selection) => {
    if (keys === 'all') {
      return;
    }

    setSelectedKeys(keys as Set<string>);
    const newStatus = keys.values().next().value;

    mutate({ id: projectId, fileId: file.id, requestBody: { status: newStatus === 'none' ? null : newStatus } });
  };

  const chip = (
    <Chip
      size="sm"
      variant="dot"
      color={STATUS_COLOR[selectedKeys.values().next().value]}
      className="absolute border-1 top-2 right-2 z-10 bg-default-100 cursor-pointer"
    >
      {STATUS_LABEL[selectedKeys.values().next().value]}
    </Chip>
  );

  if (!isEditable) {
    return chip;
  }

  return (
    <Dropdown>
      <DropdownTrigger>{chip}</DropdownTrigger>
      <DropdownMenu
        variant="flat"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="none" startContent={<span className="w-2 h-2 rounded-full bg-default" />}>
          No status
        </DropdownItem>
        <DropdownItem key="in-progress" startContent={<span className="w-2 h-2 rounded-full bg-primary" />}>
          In progress
        </DropdownItem>
        <DropdownItem key="changes-required" startContent={<span className="w-2 h-2 rounded-full bg-danger" />}>
          Changes required
        </DropdownItem>
        <DropdownItem key="review-needed" startContent={<span className="w-2 h-2 rounded-full bg-warning" />}>
          Review needed
        </DropdownItem>
        <DropdownItem key="approved" startContent={<span className="w-2 h-2 rounded-full bg-success" />}>
          Approved
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
