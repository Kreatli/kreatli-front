import React from 'react';
import data from '@emoji-mart/data';

interface Props {
  maxFrequentRows?: number;
  onEmojiSelect?: ({ native }: { native: string }) => void;
}

export const EmojiPicker = (props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldLoadPicker = React.useRef(true);

  React.useEffect(() => {
    if (shouldLoadPicker.current) {
      shouldLoadPicker.current = false;
      import('emoji-mart').then((EmojiMart) => {
        new EmojiMart.Picker({ ...props, data, ref });
      })
    }
  }, []);

  return <div ref={ref} />;
};
