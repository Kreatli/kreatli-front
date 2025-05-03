import { Image } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

import { formatBytes } from '../../../../utils/formatBytes';
import { Icon } from '../../../various/Icon';

interface Props {
  coverUrl?: string;
  fileCount: number;
  totalFileSize: number;
  path: {
    name: string;
    url: string;
  }[];
}

export const ProjectBreadcrumbs = ({
  children,
  coverUrl,
  path,
  fileCount,
  totalFileSize,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        {coverUrl ? (
          <Image src={coverUrl} width={48} height={48} radius="full" className="object-cover" />
        ) : (
          <div className="size-12 bg-foreground-100 text-foreground-500 rounded-full flex items-center justify-center">
            <Icon icon="slides" size={20} />
          </div>
        )}
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            {path.map((item, index) => (
              <React.Fragment key={item.url}>
                {index !== 0 && <Icon icon="chevronDown" className="text-foreground-400 -rotate-90" />}
                {index === path.length - 1 ? (
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                ) : (
                  <Link href={item.url} className="text-2xl font-semibold text-foreground-400 hover:text-foreground">
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          {children}
        </div>
        <div className="text-foreground-500">
          {fileCount} item{fileCount === 1 ? '' : 's'}, {formatBytes(totalFileSize)}
        </div>
      </div>
    </div>
  );
};
