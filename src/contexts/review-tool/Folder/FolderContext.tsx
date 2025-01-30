import React from 'react';

interface Context {
  uploadingFiles: File[];
  setUploadingFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FolderContext = React.createContext<Context>({
  uploadingFiles: [],
  setUploadingFiles: () => {},
});

export const useFolderContext = () => {
  const context = React.useContext(FolderContext);

  if (!context) {
    throw new Error('useFolderContext must be used within a FolderContextProvider');
  }

  return context;
};

export const FolderContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [uploadingFiles, setUploadingFiles] = React.useState<File[]>([]);

  return <FolderContext.Provider value={{ uploadingFiles, setUploadingFiles }}>{children}</FolderContext.Provider>;
};
