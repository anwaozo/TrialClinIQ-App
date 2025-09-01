"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Table } from "@tanstack/react-table"

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-1">
        {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
          .slice(
            Math.max(0, table.getState().pagination.pageIndex - 2),
            Math.min(table.getPageCount(), table.getState().pagination.pageIndex + 3),
          )
          .map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === table.getState().pagination.pageIndex + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => table.setPageIndex(pageNumber - 1)}
              className="h-8 w-8 p-0"
            >
              {pageNumber}
            </Button>
          ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
