import React from 'react';

import { File } from '../../../typings/marketplace/file';
import { formatBytes } from '../../../utils/formatBytes';
import { iconsByFileFormat } from '../../../utils/marketplace/icons';
import { Icon } from '../Icon';

interface Props {
  file: File.Type;
}

export const FileBox = ({ file }: Props) => {
  const { name, size, url, format } = file;

  const fileSize = React.useMemo(() => {
    return formatBytes(size);
  }, [size]);

  return (
    <a href={url} target="_blank" rel="noreferrer" className="flex gap-3 shadow-medium rounded-2xl p-3">
      <div>
        <div className="flex items-center justify-center rounded-xl w-10 h-10 bg-secondary-50 text-secondary">
          <Icon icon={iconsByFileFormat[format] ?? 'fileSolid'} size={28} />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold line-clamp-2 [word-break:break-word]">{name}</div>
        <div className="text-sm text-default-400">{fileSize}</div>
      </div>
      <div>
        <div className="flex items-center justify-center w-10 h-10 bg-default-100 text-default-500 rounded-xl">
          <Icon icon="arrowRightTop" size={20} />
        </div>
      </div>
    </a>
  );
};
