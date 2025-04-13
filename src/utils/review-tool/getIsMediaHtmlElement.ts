export const getIsMediaHtmlElement = (candidate?: HTMLElement | null): candidate is HTMLMediaElement => {
  if (!candidate) return false;

  return 'play' in candidate;
};
