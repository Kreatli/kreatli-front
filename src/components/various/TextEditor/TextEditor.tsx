import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import React from 'react';

import { EditorPlugin } from './EditorPlugin';
import styles from './TextEditor.module.scss';
import { Toolbar } from './Toolbar';

interface Props {
  value?: string;
  children?: React.ReactNode;
  namespace: string;
  placeholder: string;
  onChange: (content: string) => void;
}

const Placeholder = ({ placeholder }: { placeholder: string }) => (
  <div className={styles.placeholder}>{placeholder}</div>
);

export const TextEditor = ({ children, value, namespace, placeholder, onChange }: Props) => {
  const initialConfig = {
    namespace,
    theme: {
      text: {
        bold: 'textBold',
        italic: 'textItalic',
        underline: 'textUnderline',
        strikethrough: 'textStrikethrough',
        underlineStrikethrough: 'textUnderlineStrikethrough',
      },
    },
    onError(error: Error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar>{children}</Toolbar>
      <div className={styles.editorWrapper}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.contentEditable} />}
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <EditorPlugin value={value} onChange={onChange} />
    </LexicalComposer>
  );
};
