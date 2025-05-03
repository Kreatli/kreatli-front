import { addToast, Button, cn, Image } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { usePostProjectIdCover } from '../../../../../services/review-tool/hooks';
import { getProjectId, getProjects } from '../../../../../services/review-tool/services';
import { ProjectDto } from '../../../../../services/review-tool/types';
import { getIsTouchScreen } from '../../../../../utils/getIsTouchScreen';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../../various/Icon';

interface Props {
  project: ProjectDto;
  onSuccess?: () => void;
}

interface FormData {
  cover: Blob | undefined;
}

export const ChangeProjectCoverForm = ({ project, onSuccess }: Props) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(project.cover?.url);

  const { handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      cover: undefined,
    },
  });

  const queryClient = useQueryClient();
  const isTouchScreen = getIsTouchScreen();
  const { mutate, isPending } = usePostProjectIdCover();

  const onSubmit = ({ cover }: FormData) => {
    mutate(
      { id: project.id, requestBody: { cover } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.setQueryData([getProjectId.key, project.id], data);
          addToast({ title: 'Cover image was successfully updated', color: 'success', variant: 'flat' });
          onSuccess?.();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleRemove = () => {
    setValue('cover', undefined);
    setPreviewUrl(undefined);
  };

  const onDrop = React.useCallback(
    (files: File[]) => {
      const file = files[0];

      if (!file) {
        return;
      }

      if (file.size / (1024 * 1024) >= 5) {
        addToast({
          title: 'The file size should be less than 5MB',
          color: 'danger',
          variant: 'flat',
        });

        return;
      }

      setValue('cover', file);
      setPreviewUrl(URL.createObjectURL(file));
    },
    [addToast, setValue],
  );

  const { isDragActive, isDragAccept, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
      'image/gif': ['.gif'],
    },
    disabled: isPending,
    multiple: false,
    onDrop,
  });

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div
        className="relative overflow-hidden aspect-video cursor-pointer rounded-2xl border border-foreground-200"
        {...getRootProps()}
      >
        {previewUrl && (
          <>
            <Image disableAnimation src={previewUrl} removeWrapper className="aspect-video object-cover w-full" />
            {isTouchScreen && (
              <Button as="div" size="sm" variant="faded" className="absolute top-2 right-12 z-10" isIconOnly>
                <Icon icon="upload" size={16} />
              </Button>
            )}
            <Button
              size="sm"
              variant="faded"
              color="danger"
              className="absolute top-2 right-2 z-20"
              isIconOnly
              onClick={handleRemove}
            >
              <Icon icon="trash" size={16} />
            </Button>
          </>
        )}
        <div
          className={cn(
            'absolute inset-0 transition-all flex items-center justify-center bg-foreground-100 gap-2 text-sm z-10',
            {
              'opacity-0 hover:opacity-100 hover:bg-foreground-100/75': previewUrl,
              'opacity-100 bg-foreground-100/75': isDragActive && isDragAccept,
              'hover:opacity-0': isTouchScreen,
            },
          )}
        >
          <Icon icon="upload" size={20} />
          Upload cover
        </div>
        <input type="file" {...getInputProps()} />
      </div>
      <Button type="submit" isLoading={isPending} className="bg-foreground text-content1 w-fit ml-auto">
        Save changes
      </Button>
    </form>
  );
};
