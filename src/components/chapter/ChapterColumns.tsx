"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import { deleteChapter, updateChapter } from "@/lib/actions/chapter.action";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";
import SwitchUpdate from "../custom-ui/SwitchUpdateChapter";

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
      <div className="lg:w-[400px] truncate font-medium">
        <Link
          href={`/truyen/${row.original.novelSlug}/${row.original.chapterIndex}`}
          className="hover:text-green-500"
        >
          {row.original.chapterName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "isPublic",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Hiển thị" />
    ),
    cell: ({ row }) => (
      <SwitchUpdate
        initialValue={!!row.original.isPublic}
        updateFunction={() =>
          updateChapter(row.original._id, { isPublic: !row.original.isPublic })
        }
      />
    ),
  },
  {
    accessorKey: "isLock",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Khóa" />
    ),
    cell: ({ row }) => (
      <SwitchUpdate
        initialValue={!!row.original.isLock}
        updateFunction={() =>
          updateChapter(row.original._id, { isLock: !row.original.isLock })
        }
      />
    ),
  },
  {
    accessorKey: "isApprove",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Duyệt" />
    ),
    cell: ({ row }) => (
      <SwitchUpdate
        initialValue={!!row.original.isApprove}
        updateFunction={() =>
          updateChapter(row.original._id, {
            isApprove: !row.original.isApprove,
            state: row.original.isApprove ? "chưa duyệt" : "đã duyệt",
          })
        }
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
