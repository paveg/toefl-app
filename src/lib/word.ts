export const convertLexicalCategoryJp = (lexicalCategory: string) => {
  switch (lexicalCategory) {
    case 'noun':
      return '名'
    case 'verb':
      return '動'
    case 'adjective':
      return '形'
    case 'adverb':
      return '副'
    case 'preposition':
      return '前'
    case 'conjunction':
      return '接'
    case 'interjection':
      return '間'
    case 'pronoun':
      return '代'
    case 'abbreviation':
      return '略'
    default:
      return '他'
  }
}
