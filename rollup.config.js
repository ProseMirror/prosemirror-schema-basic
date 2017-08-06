module.exports = {
  entry: "./src/schema-basic.js",
  dest: "dist/schema-basic.js",
  format: "cjs",
  sourceMap: true,
  plugins: [require("rollup-plugin-buble")()],
  external(id) { return !/^[\.\/]/.test(id) }
}
