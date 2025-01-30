const BYTES_IN_KB = 1024;
const SIZES = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return '0 B';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KB));

  return `${parseFloat((bytes / BYTES_IN_KB ** i).toFixed(2))} ${SIZES[i]}`;
};
