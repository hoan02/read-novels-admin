"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import { deleteChapter, updateChapter } from "@/lib/actions/chapter.action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";
import SwitchUpdate from "../custom-ui/SwitchUpdateChapter";

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

  // {
  //   accessorKey: "isApprove",
  //   header: ({ column }) => (
  //     <DataTableColumnHeaderButton column={column} title="Duyệt" />
  //   ),
  //   cell: ({ row }) => (
  //     <SwitchUpdate
  //       initialValue={!!row.original.isApprove}
  //       updateFunction={() =>
  //         updateChapter(row.original._id, {
  //           isApprove: !row.original.isApprove,
  //           state: row.original.isApprove ? "chưa duyệt" : "đã duyệt",
  //         })
  //       }
  //     />
  //   ),
  // },
  // {
  //   accessorKey: "state",
  //   header: ({ column }) => (
  //     <DataTableColumnHeaderButton column={column} title="Trạng thái" />
  //   ),
  //   cell: ({ row }) => (
  //     <Badge
  //       variant={
  //         row.original.state === "đã duyệt"
  //           ? "default"
  //           : row.original.state === "chưa duyệt"
  //           ? "outline"
  //           : "destructive"
  //       }
  //     >
  //       {row.original.state}
  //     </Badge>
  //   ),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <Delete
  //       text={row.original.chapterName}
  //       onDelete={() => handleDelete(row)}
  //     />
  //   ),
  // },
];
