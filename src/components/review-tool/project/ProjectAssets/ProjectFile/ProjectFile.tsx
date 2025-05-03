import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useAssetContext } from '../../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useSession } from '../../../../../hooks/review-tool/useSession';
import { ProjectFileDto } from '../../../../../services/review-tool/types';
import { handleSpaceAndEnter } from '../../../../../utils/keydown';
import { Icon } from '../../../../various/Icon';
import { ProjectFileAssignee } from './ProjectFileAssignee';
import { ProjectFileCover } from './ProjectFileCover';
import { ProjectFileStatus } from './ProjectFileStatus';

interface Props {
  isSelected?: boolean;
  isDisabled?: boolean;
  file: ProjectFileDto;
  onSelectionChange?: () => void;
}

export const ProjectFile = ({ isSelected, isDisabled, file, onSelectionChange }: Props) => {
  const { name, metadata, createdBy, commentsCount } = file;
  const { isUploading = false } = metadata;

  const { user } = useSession();
  const router = useRouter();
  const { project, isProjectOwner } = useProjectContext();
  const { getAssetActions } = useAssetContext();

  const memberRole = project.members.find((member) => member.user?.id === user?.id)?.role;
  const canEdit = isProjectOwner || user?.id === createdBy?.id;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    router.push(`/project/${router.query.id}/assets/${file.id}`);
  };

  const {
    attributes,
    listeners,
    isSorting,
    transition,
    activeIndex,
    index,
    transform,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({
    id: file.id,
    disabled: isDisabled || !canEdit || isSelected,
    animateLayoutChanges: () => true,
  });

  return (
    <div
      ref={setDraggableNodeRef}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
      tabIndex={-1}
      className="flex flex-col gap-3 relative"
    >
      {activeIndex > index && (
        <div
          ref={setDroppableNodeRef}
          className="absolute top-0 bottom-0 w-[calc(100%+4rem)] -left-16 pointer-events-none"
        />
      )}
      {activeIndex < index && (
        <div
          ref={setDroppableNodeRef}
          className="absolute top-0 bottom-0 w-[calc(100%+4rem)] -right-16 pointer-events-none"
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        tabIndex={isDisabled ? -1 : 0}
        className="w-full cursor-default absolute-cursor rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2"
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFileCover file={file} isLoading={isUploading} />
        <div className="relative">
          <ProjectFileStatus
            className="border-1 z-10 absolute bottom-2 left-2"
            projectId={project.id}
            file={file}
            memberRole={memberRole}
          />
        </div>
      </div>
      {isSelected !== undefined && canEdit && (
        <Checkbox
          isSelected={isSelected}
          color="default"
          className="absolute top-2 left-2 right-2 z-10"
          onChange={onSelectionChange}
        />
      )}
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            size="sm"
            radius="full"
            isDisabled={isUploading || isSelected}
            className="z-10 absolute top-2 right-2"
            variant="faded"
            isIconOnly
          >
            <Icon icon="dots" size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          {getAssetActions(file).map((action) => (
            <DropdownItem
              key={action.label}
              color={action.color}
              showDivider={action.showDivider}
              startContent={<Icon icon={action.icon} size={16} />}
              onPress={action.onClick}
            >
              {action.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="text-lg font-semibold truncate">{name}</div>
        </div>
        <div className="flex gap-2 items-start justify-between">
          <ProjectFileAssignee projectId={project.id} file={file} members={project.members} isDisabled={isDisabled} />
          <div className="text-sm text-foreground-500">
            {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};
