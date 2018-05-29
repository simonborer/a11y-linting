module.exports = {
  extends: 'lighthouse',
  settings: {
    onlyAudits: [
      "accesskeys",
      "aria-allowed-attr",
      "aria-required-attr",
      "aria-required-children",
      "aria-required-parent",
      "aria-roles",
      "aria-valid-attr-value",
      "aria-valid-attr",
      "audio-caption",
      "button-name",
      "bypass",
      "color-contrast",
      "definition-list",
      "dlitem",
      "document-title",
      "duplicate-id",
      "frame-title",
      "html-has-lang",
      "html-lang-valid",
      "image-alt",
      "input-image-alt",
      "label",
      "layout-table",
      "link-name",
      "list",
      "listitem",
      "custom-controls-labels",
      "custom-controls-roles",
      "focus-traps",
      "focusable-controls",
      "heading-levels",
      "logical-tab-order",
      "managed-focus",
      "offscreen-content-hidden",
      "use-landmarks",
      "visual-order-follows-dom",
      "meta-refresh",
      "meta-viewport",
      "object-alt",
      "tabindex",
      "td-headers-attr",
      "th-has-data-cells",
      "valid-lang",
      "video-caption",
      "video-description",
    ],
  },
};
