import React, { useState } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
import { STYLE_MAP, MARKDOWN_SHORTCUTS } from "../constants/editorConstants";
import { clearAllStyles, handleMarkdownShortcut } from "../utils/editorUtils";
import "draft-js/dist/Draft.css";
const MyEditor = ({ editorState, setEditorState, onContentChange }) => {
  const handleChange = (newState) => {
    setEditorState(newState);
    onContentChange(newState);
  };
  const [lastBackspace, setLastBackspace] = useState(0);
  const handleEditorChange = (newEditorState) => {
    const content = newEditorState.getCurrentContent();
    const selection = newEditorState.getSelection();
    const block = content.getBlockForKey(selection.getStartKey());
    const blockText = block.getText();
    const cursorOffset = selection.getStartOffset();

    const matchingShortcut = MARKDOWN_SHORTCUTS.find(
      (shortcut) =>
        cursorOffset === shortcut.trigger.length &&
        blockText === shortcut.trigger
    );

    if (matchingShortcut) {
      const newState = handleMarkdownShortcut(
        newEditorState,
        matchingShortcut,
        selection,
        content,
        blockText,
        cursorOffset
      );
      setEditorState(newState);
      onContentChange(newState);
      return;
    }

    setEditorState(newEditorState);
    onContentChange(newEditorState);
  };

  const handleKeyCommand = (command) => {
    if (command === "backspace") {
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const block = content.getBlockForKey(selection.getStartKey());

      if (block.getText().length === 0 && selection.getStartOffset() === 0) {
        const now = Date.now();
        if (now - lastBackspace < 300) {
          let newState = clearAllStyles(editorState);
          newState = EditorState.forceSelection(newState, selection);
          setEditorState(newState);
          onContentChange(newState);
          setLastBackspace(0);
          return "handled";
        } else {
          setLastBackspace(now);
          return "not-handled";
        }
      }
    }

    if (command === "split-block") {
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      let newState = EditorState.push(
        editorState,
        Modifier.splitBlock(content, selection),
        "split-block"
      );

      const newSelection = newState.getSelection();
      const afterKey = content.getBlockAfter(selection.getStartKey())?.getKey();

      if (afterKey) {
        const nextBlockSelection = newSelection.merge({
          anchorKey: afterKey,
          focusKey: afterKey,
          anchorOffset: 0,
          focusOffset: 0,
        });
        newState = EditorState.forceSelection(newState, nextBlockSelection);
        newState = clearAllStyles(newState);
        newState = EditorState.forceSelection(newState, nextBlockSelection);
      }

      setEditorState(newState);
      onContentChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const keyBindingFn = (e) => {
    if (e.keyCode === 13) {
      return "split-block";
    }
    return getDefaultKeyBinding(e);
  };

  return (
    <Editor
      editorState={editorState}
      onChange={handleEditorChange}
      handleKeyCommand={handleKeyCommand}
      keyBindingFn={keyBindingFn}
      customStyleMap={STYLE_MAP}
      placeholder="Start writing here..."
    />
  );
};

export default MyEditor;
