"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { IconChevronLeft, IconChevronRight  } from '@tabler/icons-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [pagination, setPagination] = React.useState({
  pageIndex: 0,
  pageSize: 10,
})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // 🔑 INI KUNCI
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className=" rounded-xl bg-accent/50 border dark:bg-card dark:border-border dark:shadow-sm">
      <div className="m-3">
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-30 rounded-xl">
              <SelectValue placeholder="Pilih" />
            </SelectTrigger>

            <SelectContent>
              {[5, 10, 15, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} Baris
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      <div>
        <Table className="border">
        <TableHeader className="border-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-primary">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="">
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={cell.id}
                  className={
                    // ✅ Border kanan kecuali kolom terakhir
                    index < row.getVisibleCells().length - 1 
                      ? "border-r border-border/50" 
                      : ""
                  }
                    >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Data kosong
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>

      <div>
        <div className="grid grid-cols-3 items-center p-3 m-3">
          {/* KIRI */}
          <div className="justify-self-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft/>
              Sebelumnya
            </Button>
          </div>

          {/* TENGAH */}
          <div className="text-center text-sm text-muted-foreground">
           {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>

          {/* KANAN */}
          <div className="justify-self-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Berikutnya
              <IconChevronRight/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
