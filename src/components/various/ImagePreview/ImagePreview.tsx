import { Image, Spinner } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../Icon';

interface Props {
  src: string;
  isLoading?: boolean;
  onRemove?: () => void;
}

export const ImagePreview = ({ src, isLoading, onRemove }: Props) => {
  const loadingClassNames = 'brightness-50';

  return (
    <button type="button" disabled={isLoading} className="relative w-12 h-12" onClick={onRemove}>
      <Image
        src={src}
        removeWrapper
        className={`w-full h-full object-cover shadow-small ${isLoading && loadingClassNames}`}
      />
      {isLoading && <Spinner size="sm" color="white" className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />}
      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 text-red-500 z-10 rounded-xl opacity-0 hover:opacity-100 transition-all">
          <Icon icon="cross" />
        </div>
      )}
    </button>
  );
};
