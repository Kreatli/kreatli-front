import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useAssetContext } from '../../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { ProjectFileDto } from '../../../../../services/review-tool/types';
import { handleSpaceAndEnter } from '../../../../../utils/keydown';
import { Icon } from '../../../../various/Icon';
import { ProjectFileAssignee } from './ProjectFileAssignee';
import { ProjectFileCover } from './ProjectFileCover';

interface Props {
  isDisabled?: boolean;
  isSelected?: boolean;
  file: ProjectFileDto;
  onSelectionChange?: () => void;
}

export const ProjectFile = ({ isDisabled, isSelected, file, onSelectionChange }: Props) => {
  const { name, metadata } = file;
  const { isUploading = false } = metadata;

  const router = useRouter();
  const { project } = useProjectContext();
  const { getAssetActions } = useAssetContext();

  const handleClick = () => {
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
    animateLayoutChanges: () => true,
  });

  console.log(activeIndex);

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
      <button
        type="button"
        aria-label={`Open ${name}`}
        className="w-full cursor-default absolute-cursor rounded-2xl focus:outline-2 focus:outline outline-focus outline-offset-2"
        onKeyDown={handleSpaceAndEnter(handleClick)}
        onDoubleClick={handleClick}
      >
        <ProjectFileCover file={file} isLoading={isUploading} />
      </button>
      {isSelected !== undefined && (
        <Checkbox
          isSelected={isSelected}
          color="secondary"
          className="absolute top-2 left-2"
          onChange={onSelectionChange}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="text-lg font-semibold truncate">{name}</div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button size="sm" radius="full" isDisabled={isUploading || isDisabled} variant="light" isIconOnly>
                <Icon icon="dots" />
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
        </div>
        <div className="flex gap-2 items-center justify-between">
          <ProjectFileAssignee projectId={project.id} file={file} members={project.members} />
          {/* <div className="text-sm text-foreground-500">0 comments</div> */}
        </div>
      </div>
    </div>
  );
};
