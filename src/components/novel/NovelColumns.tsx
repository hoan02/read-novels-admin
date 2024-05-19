"use client";

import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Link2, List, Ellipsis, FilePenLine } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "../ui/button";
import Delete from "../custom-ui/Delete";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import formatDate from "@/utils/formatDate";
import { deleteNovel, updateNovel } from "@/lib/actions/novel.action";
import { DataTableColumnHeaderButton } from "../data-table/DataTableColumHeaderButton";
import SwitchUpdate from "../custom-ui/SwitchUpdateChapter";

const handleDelete = async (novelId: string) => {
  try {
    const res: any = await deleteNovel(novelId);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  } catch (err: any) {
    toast.error(err.message);
  }
};

export const novelColumns: ColumnDef<NovelType>[] = [
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
    accessorKey: "novelName",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Tên truyện" />
    ),
    cell: ({ row }) => (
      <div className="lg:w-[400px] truncate font-medium">
        <Link
          href={`/truyen/${row.original.novelSlug}/danh-sach-chuong`}
          className="hover:text-green-500"
        >
          {row.original.novelName}
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
          updateNovel(row.original._id, { isPublic: !row.original.isPublic })
        }
      />
    ),
  },
  {
    accessorKey: "chapterCount",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Chương" />
    ),
    cell: ({ row }) => (
      <div className="text-end mr-8">{row.original.chapterCount}</div>
    ),
  },
  {
    accessorKey: "readCount",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Lượt đọc" />
    ),
    cell: ({ row }) => (
      <div className="text-end mr-8">{row.original.readCount}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.original.state}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeaderButton column={column} title="Ngày đăng" />
    ),
    cell: ({ row }) => (
      <div className="ml-4">{formatDate(row.original.createdAt)}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] p-2">
          <DropdownMenuItem>
            <Link
              href={`/truyen/${row.original.novelSlug}`}
              className="flex gap-4 items-center"
            >
              <FilePenLine size={20} /> Thông tin truyện
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/truyen/${row.original.novelSlug}/danh-sach-chuong`}
              className="flex gap-4 items-center"
            >
              <List size={20} /> Danh sách chương
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`${process.env.NEXT_PUBLIC_READER_URL}truyen/${row.original.novelSlug}`}
              className="flex gap-4 items-center"
              target="_blank"
            >
              <Link2 size={20} /> Đọc truyện
            </Link>
          </DropdownMenuItem>
          <div className="px-2 py-1.5 text-sm outline-none transition-colors rounded">
            <Delete
              text={row.original.novelName}
              onDelete={() => handleDelete(row.original._id)}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
