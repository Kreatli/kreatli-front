import React from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';

import { requestImageUpload } from '../services/upload';
import { useNotifications } from './useNotifications';

interface Image {
  isLoading: boolean;
  src: string;
}

export const useImagesUpload = (defaultImages?: Image[]) => {
  const [images, setImages] = React.useState<Image[]>(defaultImages ?? []);

  const pushNotification = useNotifications((state) => state.pushNotification);

  const { isLoading, mutateAsync } = useMutation(requestImageUpload);

  const removeImage = (src: string) => {
    // TODO: remove images from database
    setImages(images.filter((image) => image.src !== src));
  };

  const handleDrop = async (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    const previewImages = files.map((file) => ({
      src: URL.createObjectURL(file),
      isLoading: true,
    }));

    setImages((imgs) => [...imgs, ...previewImages]);

    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      return mutateAsync(formData);
    });

    Promise.all(promises).then((uploadedImages) => {
      setImages((imgs) => [
        ...imgs.slice(0, -uploadedImages.length),
        ...uploadedImages.map(({ secure_url }) => ({ src: secure_url, isLoading: false })),
      ]);
    });
  };

  const handleDropRejected = (rejectedFiles: FileRejection[]) => {
    const isMaxFilesError = rejectedFiles.some(({ errors }) => errors.some((error) => error.code === 'too-many-files'));

    if (isMaxFilesError) {
      return pushNotification({
        message: 'You can upload maximum 5 images at once',
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
    },
    disabled: isLoading || images.length === 5,
    multiple: true,
    onDrop: handleDrop,
    maxFiles: 5 - images.length,
    maxSize: 1024 * 1024 * 5,
    onDropRejected: handleDropRejected,
  });

  return {
    images,
    isDragActive,
    getRootProps,
    getInputProps,
    removeImage,
    setImages,
  };
};
