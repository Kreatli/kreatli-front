import React from 'react';

export const useModalVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return {
    isModalVisible: isVisible,
    openModal,
    closeModal,
  };
};
