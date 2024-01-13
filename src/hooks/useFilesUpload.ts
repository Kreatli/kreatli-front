import React from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';

import { requestFileUpload } from '../services/upload';
import { File as FileI } from '../typings/file';
import { useNotifications } from './useNotifications';

interface FileType extends Omit<FileI.Type, '_id'> {
  isLoading: boolean;
}

export const useFilesUpload = () => {
  const [files, setFiles] = React.useState<FileType[]>([]);

  const pushNotification = useNotifications((state) => state.pushNotification);

  const { isLoading, mutateAsync } = useMutation(requestFileUpload);

  const removeFile = (url: string) => {
    // TODO: remove files from database
    setFiles(files.filter((file) => file.url !== url));
  };

  const handleDrop = async (dropFiles: File[]) => {
    if (dropFiles.length === 0) {
      return;
    }

    const previewFiles = dropFiles.map((file) => ({
      url: '',
      name: file.name,
      size: file.size,
      isLoading: true,
      format: '',
    }));

    setFiles((fls) => [...fls, ...previewFiles]);

    const promises = dropFiles.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      return mutateAsync(formData);
    });

    Promise.all(promises).then((uploadedFiles) => {
      setFiles((fls) => [
        ...fls.slice(0, -uploadedFiles.length),
        ...uploadedFiles.map(({ secure_url, bytes, format, original_filename }) => ({
          url: secure_url,
          name: `${original_filename}.${format}`,
          isLoading: false,
          size: bytes,
          format,
        })),
      ]);
    });
  };

  const handleDropRejected = (rejectedFiles: FileRejection[]) => {
    const isMaxFilesError = rejectedFiles.some(({ errors }) => errors.some((error) => error.code === 'too-many-files'));

    if (isMaxFilesError) {
      return pushNotification({
        message: 'You can upload maximum 5 files at once',
        color: 'danger',
        icon: 'error',
      });
    }

    rejectedFiles.forEach(({ file, errors }) => {
      const [error] = errors;

      if (error.code === 'file-too-large') {
        pushNotification({
          message: error.code === 'file-too-large'
            ? `File ${file.name} is larger than 5 MB`
            : error.message,
          color: 'danger',
          icon: 'error',
        });
      }
    });
  };

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
    disabled: isLoading || files.length === 5,
    multiple: true,
    onDrop: handleDrop,
    maxFiles: 5 - files.length,
    maxSize: 1024 * 1024 * 5,
    onDropRejected: handleDropRejected,
  });

  return {
    files,
    isDragActive,
    getRootProps,
    getInputProps,
    removeFile,
    setFiles,
  };
};
