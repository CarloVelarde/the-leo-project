import { useEffect, useRef } from 'react'
import { EditorState, EditorSelection, Prec } from '@codemirror/state'
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
  type Command,
} from '@codemirror/view'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  insertNewlineAndIndent,
} from '@codemirror/commands'
import {
  foldGutter,
  foldKeymap,
  bracketMatching,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
  defaultHighlightStyle,
  HighlightStyle,
  getIndentation,
  indentString,
} from '@codemirror/language'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { tags } from '@lezer/highlight'

type PythonCodeEditorProps = {
  value: string
  onChange: (value: string) => void
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

function leadingWs(lineText: string): string {
  const m = lineText.match(/^[ \t]*/)
  return m ? m[0] : ''
}

/**
 * Enter indent for Python with 4-space units.
 * After a line ending in `:`, indent one level past the current line.
 * Otherwise keep at least the current line's indent (so you stay in the block).
 */
const pythonNewlineAndIndent: Command = (view) => {
  if (view.state.readOnly) return false

  // Multi-cursor / selection → default behavior
  if (view.state.selection.ranges.some((r) => !r.empty) || view.state.selection.ranges.length > 1) {
    return insertNewlineAndIndent(view)
  }

  const { state } = view
  const pos = state.selection.main.head
  const line = state.doc.lineAt(pos)
  const beforeCursor = line.text.slice(0, pos - line.from)
  const prevIndent = leadingWs(line.text)
  const unit = state.facet(indentUnit)

  let indent = prevIndent

  // Prefer language service when it suggests a deeper indent
  const langCols = getIndentation(state, pos)
  if (langCols != null) {
    const langIndent = indentString(state, langCols)
    if (langIndent.length > indent.length) indent = langIndent
  }

  // After `def ...:` / `if ...:` always nest at least one unit
  if (beforeCursor.replace(/\s+$/, '').endsWith(':')) {
    const nested = prevIndent + unit
    if (indent.length < nested.length) indent = nested
  }

  const insert = '\n' + indent
  view.dispatch({
    changes: { from: pos, to: pos, insert },
    selection: EditorSelection.cursor(pos + insert.length),
    scrollIntoView: true,
    userEvent: 'input',
  })
  return true
}

/**
 * CodeMirror Python editor: highlighting + 4-space indent aligned with starter code.
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
      // Must match starter code (4 spaces). CM default is 2.
      indentUnit.of('    '),
      EditorState.tabSize.of(4),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      python(),
      Prec.highest(
        keymap.of([{ key: 'Enter', run: pythonNewlineAndIndent }]),
      ),
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
