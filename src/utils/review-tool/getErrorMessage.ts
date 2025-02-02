const capitalizeFirstLetter = (value: string) => {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};

export const getErrorMessage = (error: any) => {
  const errorMessage = error?.message;

  if (typeof errorMessage === 'string') {
    return errorMessage;
  }

  if ('message' in errorMessage && typeof errorMessage.message === 'string') {
    return capitalizeFirstLetter(errorMessage.message);
  }

  if ('message' in errorMessage && Array.isArray(errorMessage.message)) {
    const message = errorMessage.message[0];

    if (typeof message === 'string') {
      return capitalizeFirstLetter(errorMessage.message[0]);
    }
  }

  return 'Something went wrong';
};
