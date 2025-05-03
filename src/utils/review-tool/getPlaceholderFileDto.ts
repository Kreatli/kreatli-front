import { nanoid } from 'nanoid';

export const getPlaceholderFileDto = (file: File) => ({
  createdAt: new Date().toISOString(),
  description: '',
  fileSize: file.size,
  fileType: file.type,
  format: '',
  id: nanoid(),
  metadata: {
    isUploading: true,
  },
  commentsCount: 0,
  name: file.name,
  type: 'file' as const,
  url: URL.createObjectURL(file),
});
