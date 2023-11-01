import { PrismaClient } from '@prisma/client'
import { wordList } from './wordList'
const prisma = new PrismaClient()
async function main() {
  const words = await prisma.word.createMany({
    data: wordList
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
