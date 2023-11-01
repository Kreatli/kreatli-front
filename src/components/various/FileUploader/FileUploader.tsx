import { Button } from '@nextui-org/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useMutation } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestFileUpload } from '../../../services/upload';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../Icon';
import styles from './FileUploader.module.scss';

interface Props<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  status?: 'danger';
  rules?: UseControllerProps<T>['rules'];
}

export const FileUploader = <T extends FieldValues>({ control, name, status, rules }: Props<T>) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { field } = useController({ control, name, rules });
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { isLoading, mutate } = useMutation(requestFileUpload, {
    onSuccess: (data) => {
      field.onChange({
        url: data.secure_url,
        name: `${data.original_filename}.${data.format}`,
        size: data.bytes,
      });
      field.onBlur();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onDrop = React.useCallback((files: File[]) => {
    const file = files[0];

    if (!file) {
      return;
    }

    if ((file.size / (1024 * 1024)) >= 5) {
      pushNotification({
        color: 'danger',
        icon: 'error',
        message: 'The maximum file size is 5 MB',
      });

      return;
    }

    setSelectedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    mutate(formData);
  }, [mutate, pushNotification]);

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    disabled: isLoading,
    multiple: false,
    onDrop,
  });

  const icon = selectedFile
    ? <Icon icon="file" />
    : <Icon icon="upload" />;

  const label = selectedFile
    ? selectedFile.name
    : 'Upload file';

  const isBordered = !isLoading && (isDragActive || !!selectedFile);

  return (
    <Button
      tabIndex={-1}
      variant={isBordered ? 'bordered' : 'flat'}
      isLoading={isLoading}
      startContent={!isLoading && icon}
      color={status === 'danger' ? 'danger' : 'secondary'}
    >
      <div {...getRootProps()}>
        <div className={styles.label}>{label}</div>
        <input type="file" {...getInputProps()} />
      </div>
    </Button>
  );
};
