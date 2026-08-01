import { useEffect, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
} from '@codemirror/view'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import {
  foldGutter,
  foldKeymap,
  bracketMatching,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  HighlightStyle,
} from '@codemirror/language'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { tags } from '@lezer/highlight'

type PythonCodeEditorProps = {
  value: string
  onChange: (value: string) => void
  /** App theme: light uses a soft light editor; dark uses oneDark */
  theme?: 'light' | 'dark'
  className?: string
  minHeight?: string
}

const lightHighlight = HighlightStyle.define([
  { tag: tags.comment, color: '#6a737d', fontStyle: 'italic' },
  { tag: tags.string, color: '#032f62' },
  { tag: tags.number, color: '#005cc5' },
  { tag: tags.keyword, color: '#d73a49' },
  { tag: tags.operator, color: '#d73a49' },
  { tag: tags.definitionKeyword, color: '#d73a49' },
  { tag: tags.function(tags.variableName), color: '#6f42c1' },
  { tag: tags.variableName, color: '#24292e' },
  { tag: tags.typeName, color: '#005cc5' },
  { tag: tags.className, color: '#6f42c1' },
  { tag: tags.bool, color: '#005cc5' },
  { tag: tags.null, color: '#005cc5' },
  { tag: tags.meta, color: '#6a737d' },
])

const lightTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#f6f8fa',
      color: '#24292e',
      fontSize: '14px',
    },
    '.cm-content': {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      caretColor: '#24292e',
      padding: '12px 0',
    },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#24292e' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: '#b3d4fc',
      },
    '.cm-activeLine': { backgroundColor: '#eef2f6' },
    '.cm-gutters': {
      backgroundColor: '#f6f8fa',
      color: '#8c959f',
      border: 'none',
      borderRight: '1px solid #e8e8e8',
    },
    '.cm-activeLineGutter': { backgroundColor: '#eef2f6', color: '#24292e' },
    '.cm-line': { padding: '0 12px' },
  },
  { dark: false },
)

const darkThemeExtras = EditorView.theme(
  {
    '&': { fontSize: '14px' },
    '.cm-content': {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      padding: '12px 0',
    },
    '.cm-line': { padding: '0 12px' },
    '.cm-gutters': {
      border: 'none',
      borderRight: '1px solid #2a2a2a',
    },
  },
  { dark: true },
)

/**
 * CodeMirror-based Python editor: syntax highlighting, indent-on-Enter,
 * Tab indent, bracket matching/closing, line numbers, undo/redo.
 */
export function PythonCodeEditor({
  value,
  onChange,
  theme = 'dark',
  className,
  minHeight = '340px',
}: PythonCodeEditorProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const valueRef = useRef(value)
  valueRef.current = value

  // Create editor; recreate when theme flips
  useEffect(() => {
    if (!parentRef.current) return

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString())
      }
    })

    const baseExtensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      drawSelection(),
      dropCursor(),
      rectangularSelection(),
      crosshairCursor(),
      history(),
      foldGutter(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      python(),
      EditorState.tabSize.of(4),
      keymap.of([
        indentWithTab,
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
      ]),
      updateListener,
      EditorView.lineWrapping,
    ]

    const themeExt =
      theme === 'dark'
        ? [oneDark, darkThemeExtras]
        : [
            lightTheme,
            syntaxHighlighting(lightHighlight),
            syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
          ]

    const state = EditorState.create({
      doc: valueRef.current,
      extensions: [...baseExtensions, ...themeExt],
    })

    const view = new EditorView({
      state,
      parent: parentRef.current,
    })
    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [theme])

  // Sync external value changes (reset / show solution) without resetting cursor every keystroke
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      })
    }
  }, [value])

  return (
    <div
      ref={parentRef}
      className={className}
      style={{ minHeight, maxHeight: 'min(60vh, 520px)', overflow: 'auto' }}
      aria-label="Python editor"
    />
  )
}
