"use client";

import CodeMirror from '@uiw/react-codemirror';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { StreamLanguage } from '@codemirror/language';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      height="calc(100vh - 300px)"
      theme={darcula}
      extensions={[StreamLanguage.define(shell)]}
      onChange={onChange}
      style={{
        fontSize: '14px',
        border: '1px solid #273B53', 
        borderRadius: '8px',
      }}
    />
  );
}