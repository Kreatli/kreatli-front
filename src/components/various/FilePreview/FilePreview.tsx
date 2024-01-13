import { Spinner, Tooltip } from '@nextui-org/react';
import React from 'react';

import { iconsByFileFormat } from '../../../utils/icons';
import { Icon } from '../Icon';

interface Props {
  name: string;
  format: string;
  isLoading?: boolean;
  onRemove?: () => void;
}

export const FilePreview = ({ name, format, isLoading, onRemove }: Props) => {
  return (
    <Tooltip content={name}>
      <button
        type="button"
        aria-label="Remove file"
        disabled={isLoading}
        className="relative w-12 h-12 flex items-center justify-center shadow-small text-secondary-400 rounded-xl"
        onClick={onRemove}
      >
        {!isLoading && (
          <Icon icon={iconsByFileFormat[format] ?? 'fileSolid'} size={32} />
        )}
        {isLoading && <Spinner size="sm" color="secondary" className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />}
        {!isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 text-red-500 z-10 rounded-xl opacity-0 hover:opacity-100 transition-all">
            <Icon icon="cross" />
          </div>
        )}
      </button>
    </Tooltip>
  );
};
