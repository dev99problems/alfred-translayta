const isASCII = str => [].every.call(str, sign => sign.charCodeAt(0) <= 127)

const getTranslationSource = input => (isASCII(input) ? 'en' : 'uk')
const getTranslationTarget = input => (isASCII(input) ? 'uk' : 'en')

exports.translationDirection = input => ({
  from: getTranslationSource(input),
  to: getTranslationTarget(input)
})

exports.getTranslationSource = getTranslationSource
