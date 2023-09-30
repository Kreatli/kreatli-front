import data from '@emoji-mart/data';
import React from 'react';

interface Props {
  maxFrequentRows?: number;
  onEmojiSelect?: ({ native }: { native: string }) => void;
}

export const EmojiPicker = ({ maxFrequentRows, onEmojiSelect }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const shouldLoadPicker = React.useRef(true);

  React.useEffect(() => {
    if (shouldLoadPicker.current) {
      shouldLoadPicker.current = false;
      import('emoji-mart').then((EmojiMart) => {
        // eslint-disable-next-line no-new
        new EmojiMart.Picker({ maxFrequentRows, onEmojiSelect, data, ref });
      });
    }
  }, []);

  return <div ref={ref} />;
};
