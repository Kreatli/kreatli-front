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
import { Button, Checkbox, cn, Skeleton } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { AssetContextProvider } from '../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../contexts/review-tool/Project';
import { useGetProjectIdAssets } from '../../../../services/review-tool/custom-hooks';
import {
  usePutProjectId,
  usePutProjectIdFileFileId,
  usePutProjectIdFolderFolderId,
} from '../../../../services/review-tool/hooks';
import { getProjectIdAssets, putProjectId } from '../../../../services/review-tool/services';
import { EmptyState } from '../../../various/EmptyState';
import { Icon } from '../../../various/Icon';
import { ArchiveAssetsModal } from './ProjectAssetsBulkEdit/ArchiveAssetsModal/ArchiveAssetsModal';
import { MoveToAssetsModal } from './ProjectAssetsBulkEdit/MoveToAssetsModal';
import { ProjectFile } from './ProjectFile';
import { ProjectFileCover } from './ProjectFile/ProjectFileCover';
import { ProjectFolder } from './ProjectFolder';
import { ProjectFolderCover } from './ProjectFolder/ProjectFolderCover';

export const ProjectAssets = () => {
  const { project, search, filters } = useProjectContext();

  const { data: assetsData, isPending: isLoadingAssets } = useGetProjectIdAssets(project.id, undefined, {
    params: filters,
  });

  const assets = React.useMemo(() => {
    return assetsData?.assets ?? [];
  }, [assetsData]);

  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [assetsOrder, setAssetsOrder] = React.useState<string[]>(assets.map((asset) => asset.id));

  const [isMoveToAssetsModalOpen, setIsMoveToAssetsModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [selectedAssetIds, setSelectedAssetIds] = React.useState<Set<string>>(new Set([]));

  const queryClient = useQueryClient();
  const { mutateAsync: updateProject } = usePutProjectId({ mutationKey: [putProjectId.key, project.id] });
  const { mutateAsync: updateFolder } = usePutProjectIdFolderFolderId({ mutationKey: [putProjectId.key, project.id] });
  const { mutateAsync: updateFile } = usePutProjectIdFileFileId({ mutationKey: [putProjectId.key, project.id] });

  const dndSensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 3 } }),
  );

  React.useEffect(() => {
    setAssetsOrder(assets.map((asset) => asset.id));
  }, [assets]);

  const selectedAsset = React.useMemo(() => {
    return assets.find((asset) => asset.id === selectedAssetId);
  }, [assets, selectedAssetId]);

  const draggedAsset = React.useMemo(() => {
    return assets.find((asset) => asset.id === draggedId);
  }, [draggedId, assets]);

  const sortedAssets = React.useMemo(() => {
    return assetsOrder
      .map((id) => assets.find((asset) => asset.id === id)!)
      .filter((asset) => asset && asset.name.toLowerCase().includes(search.toLowerCase()));
  }, [assetsOrder, assets, search]);

  const hasSelectedAssets = React.useMemo(() => {
    return selectedAssetIds.size > 0;
  }, [selectedAssetIds]);

  if (isLoadingAssets) {
    return (
      <div className="overflow-hidden p-6 -m-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="aspect-video rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded" />
            <Skeleton className="size-10 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if ((search || Object.keys(filters).length > 0) && sortedAssets.length === 0) {
    return (
      <EmptyState
        title="No results found"
        text="Try adjusting your search or filters to find what you're looking for"
      />
    );
  }

  if (assets.length === 0) {
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

    const isFolder = assets.find((asset) => asset.id === active.id)?.type === 'folder';
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
          await updateFolder({
            id: project.id,
            folderId: active.id as string,
            requestBody: { parentId: overFolderId as string },
          });

          if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
            queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
          }
        } catch {
          console.error('Failed to move folder');
        }

        return;
      }

      try {
        await updateFile({
          id: project.id,
          fileId: active.id as string,
          requestBody: { parentId: overFolderId as string },
        });

        if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
        }
      } catch {
        console.error('Failed to move folder');
      }

      return;
    }

    try {
      await updateProject({ id: project.id, requestBody: { assets: newAssetsOrder } });

      if (!queryClient.isMutating({ mutationKey: [putProjectId.key, project.id] })) {
        queryClient.invalidateQueries({ queryKey: [getProjectIdAssets.key, project.id] });
      }
    } catch {
      console.error('Failed to update assets order');
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId((event.over?.id ?? null) as string | null);
  };

  const handleSelectionChange = (assetId: string) => {
    setSelectedAssetIds((prev) => {
      const newSelectedAssetIds = new Set(prev);
      if (newSelectedAssetIds.has(assetId)) {
        newSelectedAssetIds.delete(assetId);
      } else {
        newSelectedAssetIds.add(assetId);
      }
      return newSelectedAssetIds;
    });
  };

  const handleSelectAllChange = () => {
    if (selectedAssetIds.size === assets.length) {
      setSelectedAssetIds(new Set());
    } else {
      setSelectedAssetIds(new Set(assets.map((asset) => asset.id)));
    }
  };

  return (
    <div className="-mt-4">
      <div
        className={cn('sticky top-16 z-20 bg-background h-4 overflow-hidden opacity-0 transition-[height,opacity]', {
          'h-12 opacity-100': hasSelectedAssets,
        })}
      >
        <div className="py-2 pl-2 flex items-center gap-4">
          <Checkbox
            isDisabled={!hasSelectedAssets}
            isSelected={selectedAssetIds.size === assets.length}
            isIndeterminate={selectedAssetIds.size > 0 && selectedAssetIds.size < assets.length}
            color="default"
            onChange={handleSelectAllChange}
          />
          <div className="text-foreground-500 -ml-2">
            {selectedAssetIds.size} item{selectedAssetIds.size === 1 ? '' : 's'} selected
          </div>
          <Button
            variant="light"
            size="sm"
            isDisabled={!hasSelectedAssets}
            onClick={() => setIsMoveToAssetsModalOpen(true)}
          >
            <Icon icon="arrowRight" size={14} />
            Move to
          </Button>
          <Button
            variant="light"
            size="sm"
            color="danger"
            isDisabled={!hasSelectedAssets}
            onClick={() => setIsArchiveModalOpen(true)}
          >
            <Icon icon="trash" size={14} />
            Archive
          </Button>
        </div>
      </div>
      <AssetContextProvider
        projectId={project.id}
        selectedAsset={selectedAsset}
        setSelectedAssetId={setSelectedAssetId}
        project={project}
      >
        <DndContext
          sensors={dndSensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={assetsOrder}>
            <div className="overflow-hidden p-6 -m-6 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
              {sortedAssets.map((asset, index) => (
                <div key={asset.id} className={cn('relative', { 'opacity-50': draggedId === asset.id })}>
                  {asset.type === 'folder' ? (
                    <ProjectFolder
                      folder={asset}
                      isSelected={selectedAssetIds.has(asset.id)}
                      onSelectionChange={() => handleSelectionChange(asset.id)}
                    />
                  ) : (
                    <ProjectFile
                      file={asset}
                      isSelected={selectedAssetIds.has(asset.id)}
                      onSelectionChange={() => handleSelectionChange(asset.id)}
                    />
                  )}
                  {overId === asset.id && draggedAsset && (
                    <div
                      className={cn('absolute -translate-x-1/2 top-0 bottom-0 w-0.5 bg-foreground-400 rounded-xl', {
                        '-right-4': assets.indexOf(draggedAsset) < index,
                        '-left-4': assets.indexOf(draggedAsset) > index,
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
      <MoveToAssetsModal
        project={project}
        assetIds={Array.from(selectedAssetIds)}
        currentParentId={null}
        isOpen={isMoveToAssetsModalOpen}
        onClose={() => setIsMoveToAssetsModalOpen(false)}
        onSuccess={() => {
          setSelectedAssetIds(new Set());
        }}
      />
      <ArchiveAssetsModal
        isOpen={isArchiveModalOpen}
        projectId={project.id}
        assetIds={Array.from(selectedAssetIds)}
        onClose={() => setIsArchiveModalOpen(false)}
        onSuccess={() => {
          setSelectedAssetIds(new Set());
        }}
      />
    </div>
  );
};
