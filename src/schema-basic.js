const {Schema} = require("prosemirror-model")

// :: Object
//
//   doc:: NodeSpec The top level document node.
//
//   paragraph:: NodeSpec A plain paragraph textblock.
//
//   blockquote:: NodeSpec A blockquote wrapping one or more blocks.
//
//   horizontal_rule:: NodeSpec A horizontal rule.
//
//   heading:: NodeSpec A heading textblock, with a `level`
//   attribute that should hold the number 1 to 6.
//
//   code_block:: NodeSpec A code listing. Disallows marks or
//   non-text inline nodes by default.
//
//   text:: NodeSpec The text node.
//
//   image:: NodeSpec An inline image node. Supports `src`, `alt`, and
//   `href` attributes. The latter two default to the empty string.
//
//   hard_break:: NodeSpec A hard line break.
const nodes = {
  doc: {
    content: "block+"
  },

  paragraph: {
    content: "inline<_>*",
    group: "block",
    matchDOMTag: {"p": null},
    toDOM() { return ["p", 0] }
  },

  blockquote: {
    content: "block+",
    group: "block",
    matchDOMTag: {"blockquote": null},
    toDOM() { return ["blockquote", 0] }
  },

  horizontal_rule: {
    group: "block",
    matchDOMTag: {"hr": null},
    toDOM() { return ["div", ["hr"]] }
  },

  heading: {
    attrs: {level: {default: 1}},
    content: "inline<_>*",
    group: "block",
    matchDOMTag: {
      "h1": {level: 1}, "h2": {level: 2}, "h3": {level: 3},
      "h4": {level: 4}, "h5": {level: 5}, "h6": {level: 6}
    },
    toDOM(node) { return ["h" + node.attrs.level, 0] }
  },

  code_block: {
    content: "text*",
    group: "block",
    code: true,
    matchDOMTag: {"pre": [null, {preserveWhitespace: true}]},
    toDOM() { return ["pre", ["code", 0]] }
  },

  text: {
    text: true,
    group: "inline",
    selectable: false,
    toDOM(node) { return node.text }
  },

  image: {
    inline: true,
    attrs: {
      src: {},
      alt: {default: ""},
      title: {default: ""}
    },
    group: "inline",
    draggable: true,
    matchDOMTag: {"img[src]": dom => ({
      src: dom.getAttribute("src"),
      title: dom.getAttribute("title"),
      alt: dom.getAttribute("alt")
    })},
    toDOM(node) { return ["img", node.attrs] }
  },

  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    isBR: true,
    matchDOMTag: {"br": null},
    toDOM() { return ["br"] }
  }
}
exports.nodes = nodes

// :: Object
//
//  em:: MarkSpec An emphasis mark.
//
//  strong:: MarkSpec A strong mark.
//
//  link:: MarkSpec A link. Has `href` and `title` attributes.
//  `title` defaults to the empty string.
//
//  code:: MarkSpec Code font mark.
const marks = {
  em: {
    matchDOMTag: {"i": null, "em": null},
    matchDOMStyle: {"font-style": value => value == "italic" && null},
    toDOM() { return ["em"] }
  },

  strong: {
    matchDOMTag: {"b": null, "strong": null},
    matchDOMStyle: {"font-weight": value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null},
    toDOM() { return ["strong"] }
  },

  link: {
    attrs: {
      href: {},
      title: {default: ""}
    },
    matchDOMTag: {"a[href]": dom => ({
      href: dom.getAttribute("href"), title: dom.getAttribute("title")
    })},
    toDOM(node) { return ["a", node.attrs] }
  },

  code: {
    matchDOMTag: {"code": null},
    toDOM() { return ["code"] }
  }
}
exports.marks = marks

// :: Schema
// This schema rougly corresponds to the document schema used by
// CommonMark, minus the list elements, which are defined in the
// [schema-list](#schema-list) module.
//
// To reuse elements from this schema, extend or read from its
// [`nodeSpec`](#model.Schema.nodeSpec) and
// [`markSpec`](#model.Schema.markSpec) properties.
const schema = new Schema({nodes, marks})
exports.schema = schema
