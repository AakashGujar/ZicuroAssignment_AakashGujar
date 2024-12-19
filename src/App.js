import React, { useState, useEffect } from "react";
import { EditorState, RichUtils } from "draft-js";
import { INLINE_STYLES, BLOCK_TYPES } from "./constants/editorConstants";
import { saveEditorContent, loadEditorContent } from "./utils/editorUtils";
import MyEditor from "./components/MyEditor";
import "draft-js/dist/Draft.css";
import { exportToPDF } from "./utils/pdfUtils";
import {
  Bold,
  Italic,
  Underline,
  Heading,
  Sun,
  Moon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Strikethrough,
  Highlighter,
  Subscript,
  Superscript,
} from "lucide-react";

function App() {
  const [editorState, setEditorState] = useState(() => {
    try {
      const { editorState } = loadEditorContent();
      if (!editorState) {
        console.warn(
          "Editor state not initialized properly, creating empty state"
        );
        return EditorState.createEmpty();
      }
      return editorState;
    } catch (error) {
      console.error("Error initializing editor state:", error);
      return EditorState.createEmpty();
    }
  });

  const [title, setTitle] = useState(() => {
    const { title } = loadEditorContent();
    return title;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.querySelector(".container")?.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelector(".container")?.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleContentChange = (newEditorState) => {
    saveEditorContent(newEditorState, title);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    saveEditorContent(editorState, newTitle);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleBlockType = (blockType) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    setEditorState(newState);
    handleContentChange(newState);
  };

  const toggleInlineStyle = (inlineStyle) => {
    const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
    setEditorState(newState);
    handleContentChange(newState);
  };

  const handleExportToPDF = async () => {
    await exportToPDF(title, editorState.getCurrentContent());
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>
          <button className="export-button" onClick={handleExportToPDF}>
            Export to PDF
          </button>
        </div>
      </header>
      <main className="editor">
        <input
          type="text"
          placeholder="New title here..."
          className="title-input"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="instructions">
          <p>Use markdown-like shortcuts:</p>
          <p># for headings</p>
          <p>* for bold</p>
          <p>** for red text</p>
          <p>*** for underline</p>
          <p>Double backspace to remove styling of current block</p>
        </div>

        <div className="toolbar">
          <div className="toolbar-group">
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.BOLD)}
              title="Bold"
            >
              <Bold className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.RED_LINE)}
              title="Red Text"
            >
              <Italic className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.UNDERLINE)}
              title="Underline"
            >
              <Underline className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.STRIKETHROUGH)}
              title="Strikethrough"
            >
              <Strikethrough className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.HIGHLIGHT)}
              title="Highlight"
            >
              <Highlighter className="icon" />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.SUBSCRIPT)}
              title="Subscript"
            >
              <Subscript className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleInlineStyle(INLINE_STYLES.SUPERSCRIPT)}
              title="Superscript"
            >
              <Superscript className="icon" />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-button"
              onClick={() => toggleBlockType(BLOCK_TYPES.HEADER_ONE)}
              title="Heading 1"
            >
              <Heading className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleBlockType(BLOCK_TYPES.HEADER_TWO)}
              title="Heading 2"
            >
              <Heading2 className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleBlockType(BLOCK_TYPES.HEADER_THREE)}
              title="Heading 3"
            >
              <Heading3 className="icon" />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className="toolbar-button"
              onClick={() => toggleBlockType(BLOCK_TYPES.UNORDERED_LIST)}
              title="Bullet List"
            >
              <List className="icon" />
            </button>
            <button
              className="toolbar-button"
              onClick={() => toggleBlockType(BLOCK_TYPES.ORDERED_LIST)}
              title="Numbered List"
            >
              <ListOrdered className="icon" />
            </button>
          </div>
        </div>

        <div className="editor-container">
          <MyEditor
            editorState={editorState}
            setEditorState={setEditorState}
            onContentChange={handleContentChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
