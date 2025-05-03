import { Avatar, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React from 'react';

import { ProjectLogsDto } from '../../../../services/review-tool/types';
import { formatFullDate } from '../../../../utils/dates';
import { ProjectActivityLog } from './ProjectActivityLog';

interface Props {
  logs: ProjectLogsDto['logs'];
  logsCount: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const ProjectActivity = ({ logs, logsCount, page, onPageChange }: Props) => {
  const total = Math.ceil(logsCount / 20);

  const bottomContent = logsCount > 20 && (
    <Pagination
      total={total}
      color="default"
      variant="flat"
      isCompact
      showControls
      page={page}
      onChange={onPageChange}
    />
  );

  return (
    <div>
      <div className="text-foreground-500 mb-2">Total count: {logsCount}</div>
      <Table bottomContent={bottomContent} bottomContentPlacement="inside">
        <TableHeader>
          <TableColumn width={200}>Name</TableColumn>
          <TableColumn>Activity</TableColumn>
          <TableColumn width={200}>Date</TableColumn>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={log.user.avatar?.url ?? ''}
                    size="sm"
                    radius="md"
                    fallback={
                      <div className="text-lg text-foreground-500 select-none">{log.user.name[0].toUpperCase()}</div>
                    }
                  />
                  <div>{log.user.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <ProjectActivityLog log={log} />
              </TableCell>
              <TableCell>{formatFullDate(log.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
