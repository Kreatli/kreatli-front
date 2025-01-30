export const getToken = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return localStorage.getItem('token');
};

export const getHasToken = () => {
  return !!getToken();
};
