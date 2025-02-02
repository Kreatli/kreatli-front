/* eslint-disable @typescript-eslint/indent */
import { MenuItemProps } from '@nextui-org/react';
import React from 'react';

import { ArchiveAssetModal } from '../../../components/review-tool/asset/AssetModals/ArchiveAssetModal';
import { DeleteAssetModal } from '../../../components/review-tool/asset/AssetModals/DeleteAssetModal';
import { MoveToModal } from '../../../components/review-tool/asset/AssetModals/MoveToModal';
import { RenameAssetModal } from '../../../components/review-tool/asset/AssetModals/RenameAssetModal';
import { RestoreAssetModal } from '../../../components/review-tool/asset/AssetModals/RestoreAssetModal';
import { IconType } from '../../../components/various/Icon';
import { useSession } from '../../../hooks/review-tool/useSession';
import { ProjectFileDto, ProjectFolderDto } from '../../../services/review-tool/types';
import { downloadFromUrl } from '../../../utils/download';
import { useProjectContext } from '../Project';

interface Context {
  getAssetActions: (asset: ProjectFileDto | ProjectFolderDto) => {
    label: string;
    icon: IconType;
    showDivider?: boolean;
    color?: MenuItemProps['color'];
    onClick: () => void;
  }[];
  asset: ProjectFileDto | ProjectFolderDto;
}

export const AssetContext = React.createContext<Context | null>(null);

export const useAssetContext = () => {
  const context = React.useContext(AssetContext);

  if (!context) {
    throw new Error('useAssetContext must be used within a AssetContextProvider');
  }

  return context;
};

interface Props {
  isArchived?: boolean;
  projectId: string;
  selectedAsset: ProjectFileDto | ProjectFolderDto | undefined;
  setSelectedAssetId?: (id: string) => void;
}

export const AssetContextProvider = ({
  children,
  isArchived = false,
  projectId,
  selectedAsset,
  setSelectedAssetId,
}: React.PropsWithChildren<Props>) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const [isMoveToModalOpen, setIsMoveToModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = React.useState(false);

  const { user } = useSession();
  const { isProjectOwner } = useProjectContext();

  const getAssetActions = (asset: ProjectFolderDto | ProjectFileDto) => {
    if (!isProjectOwner && user?.id !== asset?.createdBy?.id) {
      if (asset?.type === 'file') {
        return [
          {
            label: 'Download',
            icon: 'download' as const,
            onClick: () => {
              downloadFromUrl(asset.url, asset.name);
            },
          },
        ];
      }

      return [];
    }

    if (isArchived) {
      return [
        ...(asset.type === 'folder'
          ? [
              {
                label: 'Restore folder',
                icon: 'update' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsRestoreModalOpen(true);
                },
              },
              {
                label: 'Delete folder',
                icon: 'trash' as const,
                color: 'danger' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsDeleteModalOpen(true);
                },
              },
            ]
          : [
              {
                label: 'Restore file',
                icon: 'update' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsRestoreModalOpen(true);
                },
              },
              {
                label: 'Delete file',
                icon: 'trash' as const,
                color: 'danger' as const,
                onClick: () => {
                  setSelectedAssetId?.(asset.id);
                  setIsDeleteModalOpen(true);
                },
              },
            ]),
      ];
    }

    return [
      {
        label: 'Rename',
        icon: 'edit' as const,
        onClick: () => {
          setSelectedAssetId?.(asset.id);
          setIsRenameModalOpen(true);
        },
      },
      {
        label: 'Move to...',
        icon: 'arrowRight' as const,
        onClick: () => {
          setSelectedAssetId?.(asset.id);
          setIsMoveToModalOpen(true);
        },
      },
      ...(asset.type === 'folder'
        ? [
            {
              label: 'Archive folder',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedAssetId?.(asset.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]
        : [
            {
              label: 'Download',
              icon: 'download' as const,
              onClick: () => {
                downloadFromUrl(asset.url, asset.name);
              },
            },
            {
              label: 'Archive file',
              icon: 'trash' as const,
              color: 'danger' as const,
              onClick: () => {
                setSelectedAssetId?.(asset.id);
                setIsArchiveModalOpen(true);
              },
            },
          ]),
    ];
  };

  return (
    <AssetContext.Provider value={{ getAssetActions, asset: selectedAsset as ProjectFolderDto | ProjectFileDto }}>
      {children}
      <RenameAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
      />
      <ArchiveAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
      />
      <MoveToModal asset={selectedAsset} isOpen={isMoveToModalOpen} onClose={() => setIsMoveToModalOpen(false)} />
      <DeleteAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <RestoreAssetModal
        projectId={projectId}
        asset={selectedAsset}
        isOpen={isRestoreModalOpen}
        onClose={() => setIsRestoreModalOpen(false)}
      />
    </AssetContext.Provider>
  );
};
