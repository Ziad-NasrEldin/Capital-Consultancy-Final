export default {
  plugins: {
    cssnano: {
      preset: ['default', {
        discardComments: { removeAll: true },
        discardDuplicates: true,
        normalizeUnicodeAndFamilyName: false,
      }],
    },
  },
};
