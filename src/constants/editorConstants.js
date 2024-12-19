export const INLINE_STYLES = {
  BOLD: "BOLD",
  RED_LINE: "RED_LINE",
  UNDERLINE: "UNDERLINE",
  STRIKETHROUGH: "STRIKETHROUGH",
  HIGHLIGHT: "HIGHLIGHT",
  CODE: "CODE",
  SUBSCRIPT: "SUBSCRIPT",
  SUPERSCRIPT: "SUPERSCRIPT",
};

export const BLOCK_TYPES = {
  HEADER_ONE: "header-one",
  HEADER_TWO: "header-two",
  HEADER_THREE: "header-three",
  BLOCKQUOTE: "blockquote",
  CODE_BLOCK: "code-block",
  ORDERED_LIST: "ordered-list-item",
  UNORDERED_LIST: "unordered-list-item",
  UNSTYLED: "unstyled",
  CENTER: "center",
  RIGHT: "right",
};

export const STYLE_MAP = {
  RED_LINE: {
    color: "red",
  },
  HIGHLIGHT: {
    backgroundColor: "#ffeeba",
  },
  CODE: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    padding: "2px 4px",
    borderRadius: "2px",
  },
  SUBSCRIPT: {
    verticalAlign: "sub",
    fontSize: "smaller",
  },
  SUPERSCRIPT: {
    verticalAlign: "super",
    fontSize: "smaller",
  },
};

export const initialContent = {
  blocks: [
    {
      key: "title",
      text: "Zicuro's Job Assesment Test",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 2,
          length: 27,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "intro",
      text: "Hi there! 👋",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 8,
          style: "",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "content",
      text: "This is my job assessment assignment, and here’s the story: 😊",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 26,
          length: 10,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "challenge",
      text: "Draft.js was a little hard to learn 😅, especially since Facebook has archived it. The docs mainly use class-based React components, which added a layer of complexity.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 9,
          style: "BOLD",
        },
        {
          offset: 86,
          length: 36,
          style: "ITALIC",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "thanks",
      text: "Thank you for this opportunity! 🎉 I learned a lot while completing this assignment and feel confident about Draft.js now.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 31,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "closing",
      text: "Looking forward to hearing from you soon! 😊",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 41,
          style: "",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "signature",
      text: "- Aakash Gujar",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 2,
          length: 12,
          style: "COLOR",
        },
      ],
      entityRanges: [],
      data: {
        color: "#007BFF",
      },
    },
  ],
  entityMap: {},
};

export const MARKDOWN_SHORTCUTS = [
  { trigger: "# ", style: "header-one", type: "block" },
  { trigger: "* ", style: "BOLD", type: "inline" },
  { trigger: "** ", style: "RED_LINE", type: "inline" },
  { trigger: "*** ", style: "UNDERLINE", type: "inline" },
];
