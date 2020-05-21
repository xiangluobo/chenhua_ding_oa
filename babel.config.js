module.exports = {
  presets: [
    ['@vue/app', {
      'polyfills': [
        'es6.string.includes'
      ]
    }]
  ],
  'plugins': [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
