const parserOptions = {};

module.exports = {
  // components: 'src/components/**/[A-Z]*.tsx',
  components: 'src/components/**/*.component.tsx',
  propsParser: require('react-docgen-typescript').withDefaultConfig([parserOptions]).parse
}
