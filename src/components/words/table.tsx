import { useReactTable, flexRender, getSortedRowModel, getCoreRowModel, getPaginationRowModel, type SortingState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import { type ColumnDef } from "@tanstack/react-table";
import { type Word } from "@prisma/client";
import { type FC, useState } from "react";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTablePagination } from "../data-table-pagination";

type Props = {
  words: Word[]
}

const convertLexicalCategoryJp = (lexicalCategory: string) => {
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

export const WordTable: FC<Props> = (props) => {
  const { words } = props
  const [sorting, setSorting] = useState<SortingState>([])
  const columns: ColumnDef<Word | undefined>[] = [
    // {
    //   header: 'level',
    //   accessorKey: 'level'
    // },
    {
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            単語
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
      header: '意味',
      accessorKey: 'meaning',
      cell: ({ row }) => {
        return <p className="text-left text-xs font-bold text-blue-700">{row.getValue('meaning')}</p>
      }
    },
    {
      header: '発音記号',
      accessorKey: 'phoneticSymbol',
      cell: ({ row }) => {
        return <p className="font-italic text-xs">{row.getValue('phoneticSymbol')}</p>
      }
    },
    {
      header: '品詞',
      accessorKey: 'lexicalCategory',
      cell: ({ row }) => {
        return <Badge>{convertLexicalCategoryJp(row.getValue('lexicalCategory'))}</Badge>
      }
    },
  ]

  const table = useReactTable({
    columns,
    data: words,
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
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
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
