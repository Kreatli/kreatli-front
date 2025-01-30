import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { cn } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { AssetContextProvider } from '../../../../../contexts/review-tool/Asset';
import { useFolderContext } from '../../../../../contexts/review-tool/Folder';
import { usePutProjectIdFileFileId, usePutProjectIdFolderFolderId } from '../../../../../services/review-tool/hooks';
import {
  getAssetFolderId,
  getProjectId,
  putProjectIdFolderFolderId,
} from '../../../../../services/review-tool/services';
import { FolderDto, ProjectDto } from '../../../../../services/review-tool/types';
import { getPlaceholderFileDto } from '../../../../../utils/review-tool/getPlaceholderFileDto';
import { EmptyState } from '../../../../various/EmptyState';
import { ProjectFile } from '../ProjectFile';
import { ProjectFileCover } from '../ProjectFile/ProjectFileCover';
import { ProjectFolder } from '../ProjectFolder';
import { ProjectFolderCover } from '../ProjectFolder/ProjectFolderCover';

interface Props {
  project: ProjectDto;
  folder: FolderDto;
}

export const ProjectFolderAssetsList = ({ project, folder }: Props) => {
  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [assetsOrder, setAssetsOrder] = React.useState<string[]>(folder.children.map((asset) => asset.id));

  const { uploadingFiles } = useFolderContext();

  React.useEffect(() => {
    setAssetsOrder(folder.children.map((asset) => asset.id));
  }, [folder]);

  const queryClient = useQueryClient();
  const { mutateAsync: updateFolder } = usePutProjectIdFolderFolderId({
    mutationKey: [putProjectIdFolderFolderId.key, project.id],
  });
  const { mutateAsync: updateFile } = usePutProjectIdFileFileId({
    mutationKey: [putProjectIdFolderFolderId.key, project.id],
  });

  const selectedAsset = React.useMemo(() => {
    return folder.children.find((asset) => asset.id === selectedAssetId);
  }, [folder, selectedAssetId]);

  const draggedAsset = React.useMemo(() => {
    return folder.children.find((asset) => asset.id === draggedId);
  }, [draggedId, folder]);

  const sortedAssets = React.useMemo(() => {
    return assetsOrder.map((id) => folder.children.find((asset) => asset.id === id)!).filter(Boolean);
  }, [assetsOrder, folder]);

  const dndSensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 3 } }),
  );

  if (folder.children.length === 0) {
    return <EmptyState title="No files" text="This folder is empty. Go ahead and upload files here" />;
  }

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedId(null);
    setOverId(null);

    if (!over || active.id === over?.id) {
      return;
    }

    const isFolder = project.assets.find((asset) => asset.id === active.id)?.type === 'folder';
    const isOverFolder = (over.id as string).includes('folder');
    const overFolderId = (over.id as string).replace('folder-', '');

    if (active.id === overFolderId) {
      return;
    }

    const oldIndex = assetsOrder.indexOf(active.id as string);
    const newIndex = assetsOrder.indexOf(overFolderId);

    const newAssetsOrder = [...assetsOrder];
    newAssetsOrder.splice(oldIndex, 1);
    newAssetsOrder.splice(newIndex, 0, ...(isOverFolder ? [] : [active.id as string]));

    setAssetsOrder(newAssetsOrder);

    //
    // TODO: Implement moving assets inside folder
    //

    if (isOverFolder) {
      if (isFolder) {
        try {
          const { project: updatedProject, parent: updatedFolder } = await updateFolder({
            id: project.id,
            folderId: active.id as string,
            requestBody: { parentId: overFolderId as string },
          });

          if (!queryClient.isMutating({ mutationKey: [putProjectIdFolderFolderId.key, project.id] })) {
            queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
            queryClient.setQueryData([getAssetFolderId.key, folder.id], updatedFolder);
          }
        } catch {
          console.error('Failed to move folder');
        }

        return;
      }

      try {
        const { project: updatedProject, parent: updatedFolder } = await updateFile({
          id: project.id,
          fileId: active.id as string,
          requestBody: { parentId: overFolderId as string },
        });

        if (!queryClient.isMutating({ mutationKey: [putProjectIdFolderFolderId.key, project.id] })) {
          queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
          queryClient.setQueryData([getAssetFolderId.key, folder.id], updatedFolder);
        }
      } catch {
        console.error('Failed to move folder');
      }
    }

    try {
      const { project: updatedProject, folder: updatedFolder } = await updateFolder({
        id: project.id,
        folderId: folder.id,
        requestBody: { children: newAssetsOrder },
      });

      if (!queryClient.isMutating({ mutationKey: [putProjectIdFolderFolderId.key, project.id] })) {
        queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
        queryClient.setQueryData([getAssetFolderId.key, folder.id], updatedFolder);
      }
    } catch (error) {
      console.error('Failed to update assets order: ', error);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId((event.over?.id ?? null) as string | null);
  };

  return (
    <AssetContextProvider projectId={project.id} selectedAsset={selectedAsset} setSelectedAssetId={setSelectedAssetId}>
      <DndContext
        sensors={dndSensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={assetsOrder}>
          <div className="overflow-hidden p-6 -m-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
            {uploadingFiles.map(getPlaceholderFileDto).map((file) => (
              <ProjectFile key={file.id} file={file} />
            ))}
            {sortedAssets.map((asset, index) => (
              <div key={asset.id} className={cn('relative', { 'opacity-50': draggedId === asset.id })}>
                {asset.type === 'folder' ? <ProjectFolder folder={asset} /> : <ProjectFile file={asset} />}
                {overId === asset.id && draggedAsset && (
                  <div
                    className={cn('absolute -translate-x-1/2 top-0 bottom-0 w-0.5 bg-foreground-400 rounded-xl', {
                      '-right-4': folder.children.indexOf(draggedAsset) < index,
                      '-left-4': folder.children.indexOf(draggedAsset) > index,
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {draggedAsset && (
            <div
              className={cn('bg-background rounded-2xl transition-transform', {
                'scale-80': overId?.includes('folder') && !overId.endsWith(draggedAsset.id),
              })}
            >
              {draggedAsset.type === 'folder' ? (
                <ProjectFolderCover key={draggedAsset.id} />
              ) : (
                <ProjectFileCover key={draggedAsset.id} file={draggedAsset} />
              )}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </AssetContextProvider>
  );
};
