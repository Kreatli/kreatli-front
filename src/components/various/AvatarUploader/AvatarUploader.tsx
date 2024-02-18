import { Button, Modal, ModalContent, Spinner, useDisclosure } from '@nextui-org/react';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop';
import { useMutation } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestImageUpload } from '../../../services/upload';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../Icon';
import styles from './AvatarUploader.module.scss';

interface Props<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  label?: string;
  status?: 'danger';
  rules?: UseControllerProps<T>['rules'];
}

const centerAspectCrop = (width: number, height: number) => (
  centerCrop(
    makeAspectCrop({ unit: '%', width: 70 }, 1, width, height),
    width,
    height,
  )
);

const getCropDimensions = (crop: Crop | undefined, originalDimensions: { width: number; height: number }) => {
  return {
    x: Math.round(((crop?.x ?? 0) / 100) * originalDimensions.width),
    y: Math.round(((crop?.y ?? 0) / 100) * originalDimensions.height),
    width: Math.round(((crop?.width ?? 0) / 100) * originalDimensions.width),
    height: Math.round(((crop?.height ?? 0) / 100) * originalDimensions.height),
  };
};

export const AvatarUploader = <T extends FieldValues>({ control, name, rules, status, label = 'avatar' }: Props<T>) => {
  const { field } = useController({ control, name, rules });

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [crop, setCrop] = React.useState<Crop>();
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState(field.value as string);
  const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = React.useState(false);

  const pushNotification = useNotifications((state) => state.pushNotification);

  React.useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const onDrop = React.useCallback((selectedFiles: File[]) => {
    const file = selectedFiles[0];

    if (!file) {
      return;
    }

    if ((file.size / (1024 * 1024)) >= 5) {
      pushNotification({
        color: 'warning',
        icon: 'warning',
        message: 'The maximum file size for images is 5 MB',
      });

      return;
    }

    setSelectedFile(file);
    onOpen();
  }, [onOpen, pushNotification]);

  const handleImageLoad = React.useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setCrop(centerAspectCrop(width, height));
    setImageDimensions({ width, height });
  }, []);

  const handleUploadImageLoad = React.useCallback(() => {
    if (!uploadedImageUrl.startsWith('blob')) {
      setIsLoading(false);
    }
  }, [uploadedImageUrl]);

  const clearSelection = React.useCallback(() => {
    onClose();
    setSelectedFile(null);
    setPreviewUrl('');
  }, [onClose]);

  const { mutate } = useMutation(requestImageUpload, {
    onSuccess: (data) => {
      setUploadedImageUrl(data.secure_url);
      field.onChange(data.secure_url);
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

  const uploadImage = React.useCallback(() => {
    if (!selectedFile) {
      return;
    }

    const { x, y, width, height } = getCropDimensions(crop, imageDimensions);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('x', x.toString());
    formData.append('y', y.toString());
    formData.append('width', width.toString());
    formData.append('height', height.toString());
    mutate(formData);

    setIsLoading(true);
    setUploadedImageUrl(previewUrl);
    clearSelection();
  }, [clearSelection, crop, imageDimensions, mutate, previewUrl, selectedFile]);

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp'],
      'image/avif': ['.avif'],
      'image/gif': ['.gif'],
    },
    disabled: isLoading,
    multiple: false,
    onDrop,
  });

  const classNames = cx(styles.wrapper, {
    [styles.error]: status === 'danger',
    [styles.dragActive]: isDragActive,
    [styles.loading]: isLoading,
  });

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <div className={classNames} {...getRootProps()}>
        <input {...getInputProps()} />
        {uploadedImageUrl && (
          <Image
            src={uploadedImageUrl}
            className={styles.image}
            fill
            alt="Avatar"
            onLoad={handleUploadImageLoad}
          />
        )}
        {isLoading
          ? (
            <span className={styles.placeholder}>
              <Spinner color="secondary" />
            </span>
          ) : (
            <span className={styles.placeholder}>
              <p className="text-xs text-current">{uploadedImageUrl ? `Change ${label}` : `Upload ${label}`}</p>
              <Icon icon="addImage" size={20} />
            </span>
          )}
      </div>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        isDismissable={!isLoading}
      >
        <ModalContent>
          <ReactCrop
            aspect={1}
            crop={crop}
            circularCrop
            keepSelection
            onChange={(_, responsiveCrop) => setCrop(responsiveCrop)}
          >
            {previewUrl && (
              <Image
                src={previewUrl}
                width="400"
                height="800"
                className={styles.imagePreview}
                alt="Preview"
                onLoad={handleImageLoad}
              />
            )}
          </ReactCrop>
          <div className={styles.previewButtons}>
            <Button aria-label="Cancel image upload" color="danger" variant="faded" isIconOnly onClick={clearSelection}>
              <Icon icon="cross" />
            </Button>
            <Button aria-label="Confirm image upload" color="success" variant="faded" isIconOnly onClick={uploadImage}>
              <Icon icon="check" />
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
