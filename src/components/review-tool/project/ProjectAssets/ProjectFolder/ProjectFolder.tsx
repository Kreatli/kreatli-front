import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useAssetContext } from '../../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { useSession } from '../../../../../hooks/review-tool/useSession';
import { ProjectFolderDto } from '../../../../../services/review-tool/types';
import { formatBytes } from '../../../../../utils/formatBytes';
import { handleSpaceAndEnter } from '../../../../../utils/keydown';
import { Icon } from '../../../../various/Icon';
import { ProjectFolderCover } from './ProjectFolderCover';

interface Props {
  isDisabled?: boolean;
  isSelected?: boolean;
  folder: ProjectFolderDto;
  onSelectionChange?: () => void;
}

export const ProjectFolder = ({ isSelected, isDisabled, folder, onSelectionChange }: Props) => {
  const { name, createdBy } = folder;

  const { user } = useSession();
  const { isProjectOwner } = useProjectContext();
  const { getAssetActions } = useAssetContext();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/project/${router.query.id}/assets/folder/${folder.id}`);
  };

  const {
    attributes,
    listeners,
    isSorting,
    activeIndex,
    index,
    transition,
    transform,
    setDraggableNodeRef,
    setDroppableNodeRef,
  } = useSortable({
    id: folder.id,
    disabled: !isProjectOwner && user?.id !== createdBy?.id,
    animateLayoutChanges: () => true,
  });

  const { setNodeRef, isOver } = useDroppable({ id: `folder-${folder.id}` });

  const actions = getAssetActions(folder);

  return (
    <div
      ref={setDraggableNodeRef}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...attributes}
      {...listeners}
      tabIndex={-1}
      className="relative group/project-folder"
    >
      {activeIndex > index && (
        <div ref={setDroppableNodeRef} className="absolute top-0 bottom-0 w-24 -left-16 pointer-events-none" />
      )}
      {activeIndex < index && (
        <div ref={setDroppableNodeRef} className="absolute top-0 bottom-0 w-24 -right-16 pointer-events-none" />
      )}
      <div ref={setNodeRef} className="absolute top-0 bottom-0 left-8 right-8" />
      <button
        type="button"
        aria-label={`Open ${name}`}
        className={cn(
          'w-full cursor-default absolute-cursor rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2',
          {
            'outline-3 outline': isOver,
          },
        )}
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFolderCover />
      </button>
      {isSelected !== undefined && (
        <Checkbox
          isSelected={isSelected}
          color="secondary"
          className="absolute top-2 left-2"
          onChange={onSelectionChange}
        />
      )}
      <div className="mt-3">
        <div className="flex gap-2 justify-between">
          <div className="text-lg font-semibold break-words overflow-hidden">{name}</div>
          {actions.length > 0 && (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button size="sm" radius="full" variant="light" isDisabled={isDisabled} isIconOnly>
                  <Icon icon="dots" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                {actions.map((action) => (
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
          )}
        </div>
        <div className="text-foreground-500">
          {folder.fileCount} items, {formatBytes(folder.totalFileSize)}
        </div>
      </div>
    </div>
  );
};
