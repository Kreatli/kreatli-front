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

import { AssetContextProvider } from '../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../contexts/review-tool/Project';
import {
  usePutProjectId,
  usePutProjectIdFileFileId,
  usePutProjectIdFolderFolderId,
} from '../../../../services/review-tool/hooks';
import { getProjectId, putProjectId } from '../../../../services/review-tool/services';
import { getPlaceholderFileDto } from '../../../../utils/review-tool/getPlaceholderFileDto';
import { EmptyState } from '../../../various/EmptyState';
import { ProjectFile } from './ProjectFile';
import { ProjectFileCover } from './ProjectFile/ProjectFileCover';
import { ProjectFolder } from './ProjectFolder';
import { ProjectFolderCover } from './ProjectFolder/ProjectFolderCover';

export const ProjectAssets = () => {
  const { project, uploadingFiles } = useProjectContext();

  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [assetsOrder, setAssetsOrder] = React.useState<string[]>(project.assets.map((asset) => asset.id));

  const queryClient = useQueryClient();
  const { mutateAsync: updateProject } = usePutProjectId({ mutationKey: [putProjectId.key, project.id] });
  const { mutateAsync: updateFolder } = usePutProjectIdFolderFolderId({ mutationKey: [putProjectId.key, project.id] });
  const { mutateAsync: updateFile } = usePutProjectIdFileFileId({ mutationKey: [putProjectId.key, project.id] });

  const dndSensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 3 } }),
  );

  React.useEffect(() => {
    setAssetsOrder(project.assets.map((asset) => asset.id));
  }, [project.assets]);

  const selectedAsset = React.useMemo(() => {
    return project.assets.find((asset) => asset.id === selectedAssetId);
  }, [project, selectedAssetId]);

  const draggedAsset = React.useMemo(() => {
    return project.assets.find((asset) => asset.id === draggedId);
  }, [draggedId, project.assets]);

  const sortedAssets = React.useMemo(() => {
    return assetsOrder.map((id) => project.assets.find((asset) => asset.id === id)!).filter(Boolean);
  }, [assetsOrder, project.assets]);

  if (uploadingFiles.length === 0 && project.assets.length === 0) {
    return (
      <EmptyState
        title="No files"
        text="You don't have any files here yet. Go ahead and upload one or create a new folder"
      />
    );
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

    if (isOverFolder) {
      if (isFolder) {
        try {
          const { project: updatedProject } = await updateFolder({
            id: project.id,
            folderId: active.id as string,
            requestBody: { parentId: overFolderId as string },
          });

          if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
            queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
          }
        } catch {
          console.error('Failed to move folder');
        }

        return;
      }

      try {
        const { project: updatedProject } = await updateFile({
          id: project.id,
          fileId: active.id as string,
          requestBody: { parentId: overFolderId as string },
        });

        if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
          queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
        }
      } catch {
        console.error('Failed to move folder');
      }

      return;
    }

    try {
      const updatedProject = await updateProject({ id: project.id, requestBody: { assets: newAssetsOrder } });

      if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
        queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
      }
    } catch {
      console.error('Failed to update assets order');
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
                      '-right-4': project.assets.indexOf(draggedAsset) < index,
                      '-left-4': project.assets.indexOf(draggedAsset) > index,
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
