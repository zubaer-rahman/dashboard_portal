"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Button } from "@repo/ui/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@repo/ui/components/ui/input";
import { FilterStatus } from "./filter-status";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  totalCount: number;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedRows,
  pagination,
  setPagination,
  totalCount,
  setSearch,
  search,
  setStatus,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    enableRowSelection: true,
  });
  useEffect(() => {
    setSelectedRows(
      table.getSelectedRowModel().rows.map((item: any) => item.original._id)
    );
  }, [table.getSelectedRowModel().rows.length]);

  const handleStatusChange = (value: string) => {
    setStatus(value === "active" ? "true" : value === "all" ? "all" : "false");
  };
  return (
    <>
      <div className="flex space-x-2">
        <Input
          placeholder="Filter users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <FilterStatus handleStatusChange={handleStatusChange} />
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <p>{`${pagination.pageIndex + 1} / ${Math.ceil(totalCount / pagination.pageSize)}`}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
