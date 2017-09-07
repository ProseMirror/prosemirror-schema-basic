module.exports = {
  input: "./src/schema-basic.js",
  output: {format: "cjs", file: "dist/schema-basic.js"},
  sourcemap: true,
  plugins: [require("rollup-plugin-buble")()],
  external(id) { return !/^[\.\/]/.test(id) }
}
