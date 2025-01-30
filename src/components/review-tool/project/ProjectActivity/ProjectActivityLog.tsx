import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useProjectContext } from '../../../../contexts/review-tool/Project';
import {
  AssetsArchivedLogDto,
  AssetsRemovedLogDto,
  AssetsRestoredLogDto,
  AssetUpdatedLogDto,
  AssetUploadedLogDto,
  FolderCreatedLogDto,
  ProjectLogsDto,
  ProjectMemberInvitedLogDto,
  ProjectUpdatedLogDto,
} from '../../../../services/review-tool/types';
import { STATUS_LABEL } from '../ProjectAssets/ProjectFile/ProjectFileStatus';

interface Props {
  log: ProjectLogsDto['logs'][number];
}

const AssetUploadedLog = ({ log }: { log: AssetUploadedLogDto }) => {
  const { project } = useProjectContext();
  const { id, name } = log.details.asset;

  return (
    <div>
      Uploaded{' '}
      <Link as={NextLink} href={`/project/${project.id}/assets/${id}`} size="sm" color="foreground" underline="always">
        {name}
      </Link>
    </div>
  );
};

const AssetUpdatedLog = ({ log }: { log: AssetUpdatedLogDto }) => {
  const { project } = useProjectContext();
  const {
    asset: { id, name, parent, type, status, assignee },
    updatedFields,
  } = log.details;

  const href = type === 'file' ? `/project/${project.id}/assets/${id}` : `/project/${project.id}/assets/folder/${id}`;
  const link = (
    <Link as={NextLink} href={href} size="sm" color="foreground" underline="always">
      {updatedFields.name ?? name}
    </Link>
  );

  if ('parent' in updatedFields) {
    if (updatedFields.parent) {
      return (
        <>
          Moved {link} to &quot;{updatedFields.parent.name}&quot; folder
        </>
      );
    }

    return (
      <>
        Moved {link} up from &quot;{parent?.name}&quot; folder
      </>
    );
  }

  if (updatedFields?.name) {
    return (
      <>
        Renamed {link} {type}
      </>
    );
  }

  if ('status' in updatedFields) {
    return (
      <>
        Changed {link} status from &quot;{status ? STATUS_LABEL[status] : 'None'}&quot; to &quot;
        {updatedFields.status ? STATUS_LABEL[updatedFields.status] : 'None'}&quot;
      </>
    );
  }

  if ('assignee' in updatedFields) {
    if (!updatedFields.assignee) {
      return (
        <>
          Unassigned {assignee?.name} from {link}
        </>
      );
    }

    return (
      <>
        Assigned {updatedFields.assignee?.name} to {link}
      </>
    );
  }

  return <>Updated {link}</>;
};

const FolderCreatedLog = ({ log }: { log: FolderCreatedLogDto }) => {
  const { project } = useProjectContext();
  const { id, name } = log.details.folder;

  return (
    <div>
      Created{' '}
      <Link
        as={NextLink}
        href={`/project/${project.id}/assets/folder/${id}`}
        size="sm"
        color="foreground"
        underline="always"
      >
        {name}
      </Link>{' '}
      folder
    </div>
  );
};

const AssetsArchivedLog = ({ log }: { log: AssetsArchivedLogDto }) => {
  const { project } = useProjectContext();
  const { assets } = log.details;

  if (assets.length === 1) {
    return (
      <>
        Archived{' '}
        <Link
          as={NextLink}
          href={`/project/${project.id}/assets${assets[0].type === 'file' ? '' : '/folder'}/${assets[0].id}`}
          size="sm"
          color="foreground"
          underline="always"
        >
          {assets[0].name}
        </Link>{' '}
        {assets[0].type}
      </>
    );
  }

  return <>Archived {assets.length} assets</>;
};

const AssetsRestoredLog = ({ log }: { log: AssetsRestoredLogDto }) => {
  const { project } = useProjectContext();
  const { assets } = log.details;

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (assets.length === 1) {
    const [asset] = assets;

    return (
      <>
        Restored{' '}
        <Link
          as={NextLink}
          href={`/project/${project.id}/assets${asset.type === 'file' ? '' : '/folder'}/${asset.id}`}
          size="sm"
          color="foreground"
          underline="always"
        >
          {asset.name}
        </Link>{' '}
        {asset.type}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        Restored {assets.length} assets. {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          as="button"
          type="button"
          size="sm"
          color="foreground"
          underline="always"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? 'Hide' : 'See'} items
        </Link>
      </div>
      {isExpanded && (
        <ul className="flex flex-col gap-2 list-disc pl-4">
          {assets.map((asset) => (
            <li>
              <Link
                key={asset.id}
                as={NextLink}
                href={
                  asset.type === 'file'
                    ? `/project/${project.id}/assets/${asset.id}`
                    : `/project/${project.id}/assets/folder/${asset.id}`
                }
                size="sm"
                color="foreground"
                underline="always"
              >
                {asset.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AssetsRemovedLog = ({ log }: { log: AssetsRemovedLogDto }) => {
  const { assets } = log.details;

  const [isExpanded, setIsExpanded] = React.useState(false);

  if (assets.length === 1) {
    const [asset] = assets;

    return (
      <>
        Deleted &quot;{asset.name}&quot; {asset.type}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        Deleted {assets.length} items. {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          as="button"
          type="button"
          size="sm"
          color="foreground"
          underline="always"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          See items
        </Link>
      </div>
      {isExpanded && (
        <ul className="flex flex-col gap-2 list-disc pl-4">
          {assets.map((asset) => (
            <li key={asset.id}>
              &quot;{asset.name}&quot; {asset.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProjectUpdatedLog = ({ log }: { log: ProjectUpdatedLogDto }) => {
  const { name, description, isCoverChanged, status } = log.details;

  if (name) {
    return `Renamed project to "${name}"`;
  }

  if (description) {
    return `Updated project description: "${description}"`;
  }

  if (isCoverChanged) {
    return 'Updated project cover image';
  }

  if (status === 'archived') {
    return 'Archived project';
  }

  if (status === 'active') {
    return 'Reactivated project';
  }

  if (status === 'completed') {
    return 'Completed project';
  }

  return 'Project updated';
};

export const ProjectMemberInvitedLog = ({ log }: { log: ProjectMemberInvitedLogDto }) => {
  return (
    <>
      Invited{' '}
      <Link href={`mailto:${log.details.user.email}`} size="sm" color="foreground" underline="always">
        {log.details.user.email}
      </Link>{' '}
      to join the project
    </>
  );
};

export const ProjectActivityLog = ({ log }: Props) => {
  if (log.type === 'ASSET_UPLOADED') {
    return <AssetUploadedLog log={log} />;
  }

  if (log.type === 'ASSET_UPDATED') {
    return <AssetUpdatedLog log={log} />;
  }

  if (log.type === 'FOLDER_CREATED') {
    return <FolderCreatedLog log={log} />;
  }

  if (log.type === 'ASSETS_ARCHIVED') {
    return <AssetsArchivedLog log={log} />;
  }

  if (log.type === 'ASSETS_RESTORED') {
    return <AssetsRestoredLog log={log} />;
  }

  if (log.type === 'ASSETS_REMOVED') {
    return <AssetsRemovedLog log={log} />;
  }

  if (log.type === 'PROJECT_UPDATED') {
    return <ProjectUpdatedLog log={log} />;
  }

  if (log.type === 'PROJECT_REMOVED') {
    return 'Deleted project';
  }

  if (log.type === 'PROJECT_CREATED') {
    return 'Created project';
  }

  if (log.type === 'PROJECT_MEMBER_INVITED') {
    return <ProjectMemberInvitedLog log={log} />;
  }

  return <div>{log.type}</div>;
};
