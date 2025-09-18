import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...pluginVue.configs['vue3-recommended'].rules
    }
  },

  pluginPrettierRecommended
]
