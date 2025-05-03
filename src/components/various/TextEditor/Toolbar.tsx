import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { $getRoot, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from 'lexical';
import React from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { EmojiPicker } from '../EmojiPicker';
import { Icon } from '../Icon';
import styles from './TextEditor.module.scss';

interface Props {
  children?: React.ReactNode;
}

export const Toolbar = ({ children }: Props) => {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isEmojiPickerOpened, setIsEmojiPickerOpen] = React.useState(false);

  const isTouchScreen = useIsTouchScreen();

  const updateToolbar = () => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsBold(selection.hasFormat('bold'));
    setIsItalic(selection.hasFormat('italic'));
    setIsUnderline(selection.hasFormat('underline'));
    setIsStrikethrough(selection.hasFormat('strikethrough'));
  };

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1,
      ),
    );
  }, [editor]);

  const formatText = (type: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const handleEmojiClick = ({ native }: { native: string }) => {
    setIsEmojiPickerOpen(false);

    editor.update(() => {
      const selection = $getSelection();

      if (selection) {
        selection.insertText(native);
      } else {
        $getRoot().selectEnd().insertText(native);
      }
    });
  };

  const widgets = [
    {
      icon: 'bold',
      className: isBold ? '' : 'text-foreground-400',
      variant: 'light',
      label: 'Format bold',
      color: isBold ? 'secondary' : undefined,
      onClick: () => formatText('bold'),
    },
    {
      icon: 'italic',
      className: isItalic ? '' : 'text-foreground-400',
      variant: 'light',
      label: 'Format italic',
      color: isItalic ? 'secondary' : undefined,
      onClick: () => formatText('italic'),
    },
    {
      icon: 'underline',
      className: isUnderline ? '' : 'text-foreground-400',
      variant: 'light',
      label: 'Format underline',
      color: isUnderline ? 'secondary' : undefined,
      onClick: () => formatText('underline'),
    },
    {
      icon: 'strikethrough',
      className: isStrikethrough ? '' : 'text-foreground-400',
      variant: 'light',
      label: 'Format strikethrough',
      color: isStrikethrough ? 'secondary' : undefined,
      onClick: () => formatText('strikethrough'),
    },
  ] as const;

  const emojiTriggerClassName = isTouchScreen ? 'hidden' : 'text-foreground-400';

  return (
    <div className={styles.widgets}>
      {children}
      {widgets.map(({ color, label, className, icon, variant, onClick }) => (
        <Button
          key={icon}
          isIconOnly
          aria-label={label}
          startContent={<Icon icon={icon} size={20} />}
          className={className}
          variant={variant}
          size="sm"
          color={color}
          onClick={onClick}
        />
      ))}
      <Popover isOpen={isEmojiPickerOpened} onOpenChange={setIsEmojiPickerOpen}>
        <PopoverTrigger>
          <Button
            key="emojiPicker"
            className={emojiTriggerClassName}
            isIconOnly
            startContent={<Icon icon="emojiHappy" size={20} />}
            variant="light"
            size="sm"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <EmojiPicker maxFrequentRows={2} onEmojiSelect={handleEmojiClick} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
