import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@nextui-org/react';
import React from 'react';

import { AssetContextProvider } from '../../../../../contexts/review-tool/Asset';
import { useProjectContext } from '../../../../../contexts/review-tool/Project';
import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { EmptyState } from '../../../../various/EmptyState';
import { Icon } from '../../../../various/Icon';
import { DeleteAssetsModal } from '../ProjectAssetsBulkEdit/DeleteAssetsModal';
import { RestoreAssetsModal } from '../ProjectAssetsBulkEdit/RestoreAssetsModal';
import { ProjectFile } from '../ProjectFile';
import { ProjectFolder } from '../ProjectFolder';

interface Props {
  assets: (ProjectFolderDto | ProjectFileDto)[];
  isError: boolean;
  isPending: boolean;
}

export const ProjectArchivedAssetsList = ({ assets, isError, isPending }: Props) => {
  const { project } = useProjectContext();

  const [selectedAssetIds, setSelectedAssetIds] = React.useState<Set<string>>(new Set([]));
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);

  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const selectedAsset = React.useMemo(() => {
    return assets.find((asset) => asset.id === selectedAssetId);
  }, [assets, selectedAssetId]);

  const hasSelectedAssets = React.useMemo(() => {
    return selectedAssetIds.size > 0;
  }, [selectedAssetIds]);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return null;
  }

  if (assets.length === 0) {
    return <EmptyState title="No archived files" text="You don't have any archived files here yet." />;
  }

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
    <>
      <div className="flex gap-2 items-center pl-2">
        <Checkbox
          isSelected={selectedAssetIds.size === assets.length}
          isIndeterminate={selectedAssetIds.size > 0 && selectedAssetIds.size < assets.length}
          color="secondary"
          onChange={handleSelectAllChange}
        />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button variant="flat" size="sm" isDisabled={!hasSelectedAssets}>
              Actions
              <Icon icon="chevronDown" size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem startContent={<Icon icon="update" size={18} />} onPress={() => setIsRestoreModalOpen(true)}>
              Restore items
            </DropdownItem>
            <DropdownItem
              color="danger"
              startContent={<Icon icon="trash" size={18} />}
              onPress={() => setIsDeleteModalOpen(true)}
            >
              Delete items
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <AssetContextProvider
        isArchived
        projectId={project.id}
        selectedAsset={selectedAsset}
        setSelectedAssetId={setSelectedAssetId}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {assets.map((asset) =>
            asset.type === 'folder' ? (
              <ProjectFolder
                key={asset.id}
                isSelected={selectedAssetIds.has(asset.id)}
                isDisabled={hasSelectedAssets}
                folder={asset}
                onSelectionChange={() => handleSelectionChange(asset.id)}
              />
            ) : (
              <ProjectFile
                key={asset.id}
                isSelected={selectedAssetIds.has(asset.id)}
                isDisabled={hasSelectedAssets}
                file={asset}
                onSelectionChange={() => handleSelectionChange(asset.id)}
              />
            ),
          )}
        </div>
      </AssetContextProvider>
      <RestoreAssetsModal
        projectId={project.id}
        isOpen={isRestoreModalOpen}
        assetIds={Array.from(selectedAssetIds)}
        onClose={() => setIsRestoreModalOpen(false)}
        onSuccess={() => setSelectedAssetIds(new Set())}
      />
      <DeleteAssetsModal
        projectId={project.id}
        isOpen={isDeleteModalOpen}
        assetIds={Array.from(selectedAssetIds)}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => setSelectedAssetIds(new Set())}
      />
    </>
  );
};
