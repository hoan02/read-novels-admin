"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import { deleteChapter, updateChapter } from "@/lib/actions/chapter.action";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";

const handleDelete = async (row: any) => {
  try {
    const res = await deleteChapter(row.original._id, row.original.novelSlug);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  } catch (err: any) {
    toast.error(err.message);
  }
};

const SwitchPublic = async ({ data }: { data: any }) => {
  const handleSwitchPublic = async () => {
    const idChapter = data._id;
    const params = {
      isPublic: !data.isPublic,
      state: data.isPublic ? "chưa duyệt" : "đã duyệt",
    };
    try {
      const res = await updateChapter(idChapter, params);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Switch
      checked={data.isPublic}
      onCheckedChange={() => handleSwitchPublic()}
    />
  );
};

export const columns: ColumnDef<ChapterType>[] = [
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
        className="hover:text-red-1"
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
    cell: ({ row }) => <SwitchPublic data={row.original} />,
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
