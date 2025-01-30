export const mergeRefs = (...refs: any[]) => {
  return (element: HTMLElement | null) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const ref of refs) {
      if (!ref) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element!;
      }
    }
  };
};
