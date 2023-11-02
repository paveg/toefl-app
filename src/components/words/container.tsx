import { api } from "~/utils/api"
import { WordTable } from "./table"
import { SkeletonTable } from "../skeleton-table"
import { TableHead, TableHeader, TableRow } from "~/ui/table"

export const WordContainer = () => {
  const { data: words, isLoading } = api.word.getAll.useQuery()

  return (
    <>
      {isLoading ? (<SkeletonTable tableHeader={
        <TableHeader>
          <TableRow>
            <TableHead className="">単語</TableHead>
            <TableHead className="">意味</TableHead>
            <TableHead className="">発音記号</TableHead>
            <TableHead className="">品詞</TableHead>
          </TableRow>
        </TableHeader>
      } columnCount={4} />) : (words?.length && <WordTable words={words} />)}
    </>
  )
}
