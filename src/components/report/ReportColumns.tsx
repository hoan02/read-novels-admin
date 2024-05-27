"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import formatDate from "@/utils/formatDate";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";

export const reportColumns: ColumnDef<ReportWithUserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="lg:w-[400px] truncate font-medium">
        <Link
          href={`/xu-ly-bao-cao/${row.original._id}`}
          className="hover:text-green-500"
        >
          {row.original.title}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Người tạo" />
    ),
    cell: ({ row }) => (
      <div className="ml-4">{row.original.userInfo.username}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => (
      <div>{row.original.isResolved ? "Đã giải quyết" : "Chưa giải quyết"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
];
