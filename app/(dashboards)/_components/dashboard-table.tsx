"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type React from "react";
import { useRef } from "react";
import { TablePagination } from "./dashboard-pagination";

interface DashboardTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
  hasPagination?: boolean;
}

export default function DashboardTable<TData>({
  data,
  columns,
  totalItems,
  currentPage = 1,
  pageSize = 10,
  hasPagination = true,
  emptyState,
}: DashboardTableProps<TData> & { emptyState?: React.ReactNode }) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    rowCount: totalItems,
  });

  return (
    <>
      <div ref={tableContainerRef} className="rounded-md border-none">
        <Table className="bg-white">
          <TableHeader className="bg-blue-50 hover:bg-blue-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-none hover:bg-blue-50 whitespace-nowrap"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-8 py-5 font-semibold  text-blue-950"
                  >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index, array) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    index !== array.length - 1
                      ? "border-b border-b-gray-100 text-gray-700"
                      : "hover:bg-gray-50 text-gray-700",
                    "data-[state=selected]:bg-gray-100"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-8 py-5 whitespace-nowrap"
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
                  className="h-24 text-center px-8"
                >
                  {emptyState || "No data to display 🐌"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {hasPagination && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-2 py-4 px-6 border-t border-t-gray-100">
          {totalItems > 0 ? (
            <div className="text-sm text-muted-foreground">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)}{" "}
              to {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
              entries
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No entries</div>
          )}
          <TablePagination table={table} />
        </div>
      )}
    </>
  );
}
