import { PrismaClient } from '@prisma/client'
import { wordList } from './wordList';
const prisma = new PrismaClient()
async function main() {
  const existingWords = await prisma.word.findMany({
    where: {
      word: {
        in: wordList.map((word) => word.word)
      }
    }
  })
  const existingList = existingWords.map((word) => word.word)
  const newWords = wordList.filter((word) => {
    return !existingList.includes(word.word)
  })
  await prisma.word.createMany({
    data: newWords
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
