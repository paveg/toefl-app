import { useReactTable, flexRender, getSortedRowModel, getCoreRowModel, getPaginationRowModel, type SortingState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import { type ColumnDef } from "@tanstack/react-table";
import { type Word } from "@prisma/client";
import { type FC, useState, useMemo } from "react";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";
import { ArrowUpDown, CheckCircle, Eye, EyeOff, Pen } from "lucide-react";
import { DataTablePagination } from "../../data-table-pagination";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/ui/dropdown-menu";
import { api } from "~/utils/api";
import { LoadingButton } from "../../loading-button";
import { convertLexicalCategoryJp } from "~/lib/word";
import { type DefaultSession } from "next-auth";
import { useToast } from "~/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  user: DefaultSession['user'] & {
    id: string;
  };
  words: Word[];
}

export const LoggedinWordTable: FC<Props> = (props) => {
  const { words, user } = props
  const queryClient = useQueryClient();
  const { toast } = useToast()
  const { data: userWords, isLoading } = api.userWord.getAllByUserId.useQuery({ userId: user.id })
  const queryKey = api.userWord.getAllByUserId.getQueryKey({ userId: user.id })
  const [sorting, setSorting] = useState<SortingState>([])
  const [hideMemorizedRow, setHideMemorizedRow] = useState<boolean>(false)
  const columns: ColumnDef<Word | undefined>[] = [
    // {
    //   header: 'level',
    //   accessorKey: 'level'
    // },
    {
      header: () => {
        return (
          <Button onClick={() => setHideMemorizedRow(!hideMemorizedRow)} variant="ghost">
            {hideMemorizedRow ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
        )
      },
      id: 'userWord',
      enableHiding: false,
      cell: ({ row }) => {
        const word = row.original
        const userWord = userWords?.find(userWord => userWord.wordId === word?.id)
        const { mutateAsync: createWord } = api.userWord.createByWordId.useMutation()
        const { mutateAsync: deleteWord } = api.userWord.deleteById.useMutation()

        if (isLoading || !word) {
          return <LoadingButton />
        } else {
          return userWord ?
            <Button variant="ghost" onClick={
              () => deleteWord({
                id: userWord.id,
              }, {
                onSuccess: () => {
                  toast({
                    title: `${userWord.word.word}を学習済みから削除しました。`,
                    variant: "destructive",
                  })
                },
                onSettled: () => {
                  void queryClient.invalidateQueries({ queryKey: queryKey })
                }
              })}>
              <CheckCircle className="h-4 w-4" />
            </Button > :
            <Button variant="ghost" onClick={() => createWord({
              wordId: word.id,
              userId: user.id,
            }, {
              onSuccess: (newRecord) => {
                toast({
                  title: `${newRecord.word.word}を学習済みに追加しました。`,
                })
              },
              onSettled: () => {
                void queryClient.invalidateQueries({ queryKey: queryKey })
              }
            })}>
              <Pen className="h-4 w-4" />
            </Button >
        }
      }
    },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Word
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: 'word',
      cell: ({ row }) => {
        return <p className="font-bold">{row.getValue('word')}</p>
      }
    },
    {
      header: 'Meaning',
      accessorKey: 'meaning',
      cell: ({ row }) => {
        return <p className="text-left text-xs font-bold text-blue-700">{row.getValue('meaning')}</p>
      }
    },
    {
      header: 'Phonetic Symbol',
      accessorKey: 'phoneticSymbol',
      cell: ({ row }) => {
        return <p className="font-italic text-xs">{row.getValue('phoneticSymbol')}</p>
      }
    },
    {
      header: 'Lexical Category',
      accessorKey: 'lexicalCategory',
      cell: ({ row }) => {
        return <Badge>{convertLexicalCategoryJp(row.getValue('lexicalCategory'))}</Badge>
      }
    },
    // {
    //   id: "actions",
    //   enableHiding: true,
    //   cell: ({ row }) => {
    //     const word = row.original

    //     return (
    //       <DropdownMenu key={word.id}>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">メニューを開く</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem onClick={() => console.info(word.id)}>Done</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu >
    //     )
    //   },
    // },
  ]
  const filteredWords = useMemo(
    () => words.filter((word) => hideMemorizedRow ? !userWords?.some((uw) => uw.wordId === word?.id) : true), [words, userWords, hideMemorizedRow]
  )
  const table = useReactTable({
    columns,
    data: filteredWords,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  })

  return <div>
    <Table className="table-auto rounded-md mb-4">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="">
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const word = row.original
            return hideMemorizedRow && userWords?.find((uw) => uw.wordId === word?.id) ? null : (<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => {
                return <TableCell key={cell.id} className="">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              })}
            </TableRow>)
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              英単語が存在しません。
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <DataTablePagination table={table} />
  </div>
}
