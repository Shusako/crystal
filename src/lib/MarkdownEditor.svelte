<script lang="ts">
  import { basicSetup, EditorView } from 'codemirror';
  import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
  import { languages } from '@codemirror/language-data';
  import { onMount } from 'svelte';

  import {
    keymap,
    highlightSpecialChars,
    drawSelection,
    highlightActiveLine,
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    lineNumbers,
    highlightActiveLineGutter,
  } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import {
    defaultHighlightStyle,
    syntaxHighlighting,
    indentOnInput,
    bracketMatching,
    foldGutter,
    foldKeymap,
    HighlightStyle,
  } from '@codemirror/language';
  import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
  import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
  import {
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap,
  } from '@codemirror/autocomplete';
  import { lintKeymap } from '@codemirror/lint';
  import { tags } from '@lezer/highlight';

  // Our list of completions (can be static, since the editor
  /// will do filtering based on context).
  const completions = [
    { label: 'panic', type: 'keyword' },
    { label: 'park', type: 'constant', info: 'Test completion' },
    { label: 'password', type: 'variable' },
  ];

  function myCompletions(context: { matchBefore: (arg0: RegExp) => any; explicit: any; pos: any }) {
    let before = context.matchBefore(/\w+/);
    // If completion wasn't explicitly started and there
    // is no word before the cursor, don't open completions.
    if (!context.explicit && !before) return null;
    return {
      from: before ? before.from : context.pos,
      options: completions,
      validFor: /^\w*$/,
    };
  }

  let myTheme = EditorView.theme(
    {
      '&': {
        color: 'var(--text-default)',
        backgroundColor: 'var(--background-primary-default)',
      },
      '.cm-content': {
        caretColor: 'var(--color-highlight-light)',
        minHeight: '75vh',
      },
      '.cm-gutter': {
        minHeight: '75vh',
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: 'var(--color-highlight-light)',
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: 'var(--color-highlight-light-transparent)',
      },

      '.cm-activeLine': {
        backgroundColor: '#0000',
        // backgroundColor: 'var(--background-primary-dark-transparent)',
        // backgroundColor: '#1a1a1a66',
      },

      '.cm-selectionMatch': {
        backgroundColor: 'var(--background-primary-lighter)',
      },

      '.cm-gutters': {
        backgroundColor: 'var(--background-secondary-default)',
        color: 'var(--text-default)',
        border: 'none',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'var(--background-secondary-dark)',
      },
      '.cm-gutterElement': {},

      '.cm-foldPlaceholder': {
        backgroundColor: 'var(--background-primary-lighter)',
        borderColor: 'var(--background-secondary-light)',
        color: 'var(--text-subtle)',
      },
    },
    { dark: true }
  );

  // Taken from https://github.com/codemirror/theme-one-dark/blob/main/src/one-dark.ts
  const chalky = '#e5c07b',
    coral = '#e06c75',
    cyan = '#56b6c2',
    invalid = '#ffffff',
    ivory = '#abb2bf',
    stone = '#7d8799',
    malibu = '#61afef',
    sage = '#98c379',
    whiskey = '#d19a66',
    violet = '#c678dd',
    darkBackground = '#21252b',
    highlightBackground = '#2c313a',
    background = '#282c34',
    tooltipBackground = '#353a42',
    selection = '#3E4451',
    cursor = '#528bff';

  const markdownHighlighting = HighlightStyle.define([
    { tag: tags.keyword, color: violet },
    {
      tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
      color: coral,
    },
    { tag: [tags.function(tags.variableName), tags.labelName], color: malibu },
    { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey },
    { tag: [tags.definition(tags.name), tags.separator], color: ivory },
    {
      tag: [
        tags.typeName,
        tags.className,
        tags.number,
        tags.changed,
        tags.annotation,
        tags.modifier,
        tags.self,
        tags.namespace,
      ],
      color: chalky,
    },
    {
      tag: [
        tags.operator,
        tags.operatorKeyword,
        tags.url,
        tags.escape,
        tags.regexp,
        tags.link,
        tags.special(tags.string),
      ],
      color: cyan,
    },
    { tag: [tags.meta, tags.comment], color: stone },
    { tag: tags.strong, fontWeight: 'bold' },
    { tag: tags.emphasis, fontStyle: 'italic' },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
    { tag: tags.link, color: stone, textDecoration: 'underline' },
    { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey },
    { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage },
    { tag: tags.invalid, color: invalid },

    { tag: tags.heading1, fontSize: '2.2em' },
    { tag: tags.heading2, fontSize: '2.0em' },
    { tag: tags.heading3, fontSize: '1.8em' },
    { tag: tags.heading4, fontSize: '1.6em' },
    { tag: tags.heading5, fontSize: '1.4em' },
    { tag: tags.heading6, fontSize: '1.2em' },
  ]);

  let editorElement: HTMLElement;

  // TODO: extend markdown for secret text
  // https://discuss.codemirror.net/t/adding-support-for-the-additional-inline-syntax-to-markdown/3099/3
  // https://github.com/lezer-parser/markdown see Extension

  onMount(() => {
    let editorView = new EditorView({
      doc: "// Type a 'p'\n// Type a 'p'\n// Type a 'p'\n\n# Header\n**bold**\n*italic*\n*both*\n\n## H2\nText 1\nText 2\n\n### H3\nText\n\n#### H4\nText\n\n##### H5\nText\n\n###### H6\nText\n\n```typescript\nfunction funName() {\n  const vard: string=\"magic string\";\n}\n```",
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        // foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(markdownHighlighting),
        syntaxHighlighting(defaultHighlightStyle),
        bracketMatching(),
        closeBrackets(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
        autocompletion({ override: [myCompletions] }),
        markdown({
          defaultCodeLanguage: markdownLanguage,
          codeLanguages: languages,
        }),
        // markdown().language,
        myTheme,
      ],
      parent: editorElement,
    });
  });
</script>

<div class="h-full" bind:this={editorElement} />
