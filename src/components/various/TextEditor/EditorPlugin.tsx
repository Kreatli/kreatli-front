import React from 'react';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $isRootTextContentEmpty } from '@lexical/text';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { $getRoot, $insertNodes, BLUR_COMMAND, CLEAR_EDITOR_COMMAND } from 'lexical';

interface Props {
  value?: string;
  onChange: (content: string) => void;
}

export const EditorPlugin = ({ value, onChange }: Props) => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.registerCommand(BLUR_COMMAND, () => {
      if ($isRootTextContentEmpty(false)) {
        onChange('');

        return false;
      }

      const htmlString = $generateHtmlFromNodes(editor, null);
      onChange(htmlString);

      return false;
    }, 1);
  }, []);

  React.useEffect(() => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);

      if (htmlString === value) {
        return;
      }

      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);

      const parser = new DOMParser();
      const dom = parser.parseFromString(value ?? '', 'text/html');

      const nodes = $generateNodesFromDOM(editor, dom);

      $getRoot().select();

      $insertNodes(nodes);
    });
  }, [value]);

  return <ClearEditorPlugin />;
};
