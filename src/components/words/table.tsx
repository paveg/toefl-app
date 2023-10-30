import { useReactTable, flexRender, getSortedRowModel, getCoreRowModel, type SortingState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/ui/table"
import { api } from "~/utils/api"
import { type ColumnDef } from "@tanstack/react-table";
import { type Word } from "@prisma/client";
import { useState } from "react";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";
import { ArrowUpDown } from "lucide-react";

export const WordTable = () => {
  const { data: words, isLoading } = api.word.getAll.useQuery()
  const [sorting, setSorting] = useState<SortingState>([])
  const columns: ColumnDef<Word>[] = [
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
        return <p className="text-left">{row.getValue('meaning')}</p>
      }
    },
    {
      header: '品詞',
      accessorKey: 'lexicalCategory',
      cell: ({ row }) => {
        return <Badge>{row.getValue('lexicalCategory')}</Badge>
      }
    },
  ]

  const table = useReactTable({
    columns,
    data: words,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  })

  if (isLoading) {
    return <>Loading...</>
  } else {
    return <Table className="table-auto">
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
  }
}
