"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";

export const userColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Họ và tên" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/users/${row.original.username}`}
        className="truncate font-medium"
      >
        {row.original.firstName} {row.original.lastName}
      </Link>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/users/${row.original.username}`}
        className="truncate font-medium"
      >
        {row.original.username}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="truncate font-medium">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Vai trò" />
    ),
    cell: ({ row }) => (
      <div className="truncate font-medium">{row.original.role}</div>
    ),
  },
  {
    accessorKey: "premium",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Premium" />
    ),
    cell: ({ row }) => (
      <div className="truncate font-medium">
        {row.original?.publicMetadata?.premium?.state ? "Có" : "Không"}
      </div>
    ),
  },
];
