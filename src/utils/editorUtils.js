import {
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { BLOCK_TYPES, initialContent } from "../constants/editorConstants";

export const clearAllStyles = (editorState) => {
  let newState = editorState;
  const selection = newState.getSelection();
  const content = newState.getCurrentContent();
  const block = content.getBlockForKey(selection.getStartKey());

  if (block.getType() !== BLOCK_TYPES.UNSTYLED) {
    newState = RichUtils.toggleBlockType(newState, BLOCK_TYPES.UNSTYLED);
  }

  const currentStyle = newState.getCurrentInlineStyle();
  if (currentStyle.size > 0) {
    currentStyle.forEach((style) => {
      newState = RichUtils.toggleInlineStyle(newState, style);
    });
  }
  return newState;
};

export const handleMarkdownShortcut = (
  editorState,
  shortcut,
  selection,
  content,
  blockText,
  cursorOffset
) => {
  const contentWithoutMarker = Modifier.replaceText(
    content,
    selection.merge({ anchorOffset: 0, focusOffset: shortcut.trigger.length }),
    ""
  );

  let newState = EditorState.push(
    editorState,
    contentWithoutMarker,
    "remove-range"
  );

  if (shortcut.type === "block") {
    newState = RichUtils.toggleBlockType(newState, shortcut.style);
  } else {
    newState = RichUtils.toggleInlineStyle(newState, shortcut.style);
  }

  return newState;
};

export const saveEditorContent = (editorState, title) => {
  const content = convertToRaw(editorState.getCurrentContent());
  localStorage.setItem("editorContent", JSON.stringify(content));
  localStorage.setItem("editorTitle", title);
};

export const loadEditorContent = () => {
  try {
    const savedContent = localStorage.getItem("editorContent");
    const savedTitle = localStorage.getItem("editorTitle") || "";

    let editorState;

    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        const content = convertFromRaw(parsedContent);
        editorState = EditorState.createWithContent(content);
      } catch (parseError) {
        console.error("Error parsing saved content:", parseError);
        const contentState = convertFromRaw(initialContent);
        editorState = EditorState.createWithContent(contentState);
      }
    } else {
      console.log("No saved content found, using initial content");
      const contentState = convertFromRaw(initialContent);
      editorState = EditorState.createWithContent(contentState);
    }

    return { editorState, title: savedTitle };
  } catch (error) {
    console.error("Error in loadEditorContent:", error);
    return {
      editorState: EditorState.createEmpty(),
      title: "",
    };
  }
};
