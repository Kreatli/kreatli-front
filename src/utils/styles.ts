export const maxNLinesStyles = (linesNumber = 2) => {
  return {
    display: '-webkit-box',
    '-webkit-line-clamp': linesNumber,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  };
};
