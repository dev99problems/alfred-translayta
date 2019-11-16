const alfy = require('alfy')

const { createArgWithAction } = require('./utils.js')

const { word, translations } = process.env

alfy.output([
  {
    title: word,
    subtitle: translations
  },
  {
    title: 'Remove',
    arg: createArgWithAction('remove')
  },
  {
    title: 'Edit',
    arg: createArgWithAction('edit')
  }
])
