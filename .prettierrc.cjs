module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$', // React imports first
    '^[a-z]', // Other libraries (third-party)
    '^@/components/(.*)$', // Components from specific paths
    '^(.*)(/|\\.)(ts|js)$', // Files ending in .ts or .js
    '^./styles/(.*)$', // Styles imports
  ],
  importOrderSeparation: true, // Separate groups with a newline
  importOrderSortSpecifiers: true, // Sort the import specifiers inside braces
};
