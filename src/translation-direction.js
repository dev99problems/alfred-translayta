const isASCII = str => [].every.call(str, sign => sign.charCodeAt(0) <= 127)

const getTranslationSource = input => (isASCII(input) ? 'en' : 'ru')
const getTranslationTarget = input => (isASCII(input) ? 'ru' : 'en')

exports.translationDirection = input => ({
  from: getTranslationSource(input),
  to: getTranslationTarget(input)
})

exports.getTranslationSource = getTranslationSource
