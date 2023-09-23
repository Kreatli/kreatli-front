import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React from 'react';
import { Toolbar } from './Toolbar';

import styles from './TextEditor.module.scss';
import { EditorPlugin } from './EditorPlugin';

interface Props {
  value?: string;
  children?: React.ReactNode;
  namespace: string;
  placeholder: string;
  onChange: (content: string) => void;
}

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

  const Placeholder = () => (
    <div className={styles.placeholder}>{placeholder}</div>
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar>{children}</Toolbar>
      <div className={styles.editorWrapper}>
        <RichTextPlugin contentEditable={<ContentEditable className={styles.contentEditable} />} placeholder={<Placeholder />} ErrorBoundary={LexicalErrorBoundary} />
      </div>
      <EditorPlugin value={value} onChange={onChange} />
    </LexicalComposer>
  );
};
