/**
 * Type stub for the global stylesheet. Next declares `*.module.css` but nothing
 * for a plain side-effect import, so `import "../styles/globals.css"` has no
 * declaration to resolve and editors report ts(2882).
 *
 * TypeScript looks for `<name>.d.css.ts` beside the stylesheet (the
 * allowArbitraryExtensions mechanism), which is the supported way to type an
 * import of a non-TS file. The stylesheet exports nothing.
 */
export {};
