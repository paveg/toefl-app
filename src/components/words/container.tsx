import { api } from "~/utils/api"
import { WordTable } from "./table"

export const WordContainer = () => {
  const { data: words, isLoading } = api.word.getAll.useQuery()

  return (
    <>
      {isLoading ? (<div>Loading...</div>) : (words?.length && <WordTable words={words} />)}
    </>
  )
}
