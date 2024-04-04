import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isRootTextContentEmpty } from '@lexical/text';
import { $getRoot, $insertNodes, BLUR_COMMAND, CLEAR_EDITOR_COMMAND } from 'lexical';
import React from 'react';

interface Props {
  value?: string;
  initialValue?: string;
  onChange: (content: string) => void;
}

export const EditorPlugin = ({ value, initialValue, onChange }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [isInitialValueSet, setIsInitialValueSet] = React.useState(false);

  React.useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        if ($isRootTextContentEmpty(false)) {
          onChange('');

          return false;
        }

        const htmlString = $generateHtmlFromNodes(editor, null);
        onChange(htmlString);

        return false;
      },
      1,
    );
  }, []);

  React.useEffect(() => {
    if (!isInitialValueSet && !initialValue) {
      setIsInitialValueSet(true);

      return;
    }

    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(value ?? '', 'text/html');

      const nodes = $generateNodesFromDOM(editor, dom);

      $getRoot().select();

      $insertNodes(nodes);
    });
  }, [initialValue, value]);

  return <ClearEditorPlugin />;
};
