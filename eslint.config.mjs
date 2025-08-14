import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt().override('nuxt/typescript', {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
