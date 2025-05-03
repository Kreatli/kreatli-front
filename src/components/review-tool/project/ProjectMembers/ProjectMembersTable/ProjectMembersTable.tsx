import { Avatar, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React from 'react';

import { ProjectMemberDto } from '../../../../../services/review-tool/types';
import { formatFullDate } from '../../../../../utils/dates';
import { getProjectMemberLetter } from '../../../../../utils/review-tool/shortNames';
import { ProjectMemberRowActions } from './ProjectMemberRowActions';

interface Props {
  members: ProjectMemberDto[];
  isLoading?: boolean;
  isEditable?: boolean;
  onRemove: (member: ProjectMemberDto) => void;
  onResendInvite: (member: ProjectMemberDto) => void;
}

const STATUS_COLORS = {
  invited: 'warning',
  joined: 'success',
  left: 'danger',
  removed: 'danger',
} as const;

export const ProjectMembersTable = ({ members, isLoading, isEditable = false, onRemove, onResendInvite }: Props) => {
  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn width="1"> </TableColumn>
        <TableColumn>NAME</TableColumn>
        <TableColumn>INVITATION DATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn align="end" width="1">
          {isLoading && <Spinner size="sm" color="current" />}
        </TableColumn>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <Avatar
                src={member.user?.avatar?.url}
                size="sm"
                isBordered
                fallback={
                  <div className="text-lg text-foreground-500 select-none">{getProjectMemberLetter(member)}</div>
                }
              />
            </TableCell>
            <TableCell>
              <div className="text-medium font-semibold">{member.user?.name}</div>
              <div className="text-foreground-500">{member.email}</div>
            </TableCell>
            <TableCell>{formatFullDate(member.invitedAt)}</TableCell>
            <TableCell>
              <Chip color={STATUS_COLORS[member.status]} variant="flat">
                {member.status}
              </Chip>
            </TableCell>
            <TableCell>
              {isEditable && (
                <ProjectMemberRowActions
                  member={member}
                  isDisabled={isLoading}
                  onResendInvite={() => onResendInvite(member)}
                  onRemove={() => onRemove(member)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
