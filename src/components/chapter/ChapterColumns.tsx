"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import { deleteChapter, updateChapter } from "@/lib/actions/chapter.action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";
import SwitchUpdateChapter from "../custom-ui/SwitchUpdateChapter";

const handleDelete = async (row: any) => {
  try {
    const res = await deleteChapter(row.original._id, row.original.novelSlug);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const chapterColumns: ColumnDef<ChapterType>[] = [
  {
    accessorKey: "chapterNumber",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="STT" />
    ),
    cell: ({ row }) => <p>{`${row.original.chapterIndex}`}</p>,
  },
  {
    accessorKey: "chapterName",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Tên chương" />
    ),
    cell: ({ row }) => (
      <Link
        href={`/truyen/${row.original.novelSlug}/${row.original.chapterIndex}`}
        className="hover:text-green-500 grow"
      >
        {row.original.chapterName}
      </Link>
    ),
  },
  {
    accessorKey: "isPublic",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Hiển thị" />
    ),
    cell: ({ row }) => (
      <SwitchUpdateChapter
        id={row.original._id}
        field="isPublic"
        initialValue={!!row.original.isPublic}
      />
    ),
  },
  {
    accessorKey: "isLock",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Khóa" />
    ),
    cell: ({ row }) => (
      <SwitchUpdateChapter
        id={row.original._id}
        field="isLock"
        initialValue={!!row.original.isLock}
      />
    ),
  },
  {
    accessorKey: "isApprove",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Duyệt" />
    ),
    cell: ({ row }) => (
      <SwitchUpdateChapter
        id={row.original._id}
        field="isApprove"
        initialValue={!!row.original.isApprove}
      />
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.state === "đã duyệt"
            ? "default"
            : row.original.state === "chưa duyệt"
            ? "outline"
            : "destructive"
        }
      >
        {row.original.state}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Delete
        text={row.original.chapterName}
        onDelete={() => handleDelete(row)}
      />
    ),
  },
];
