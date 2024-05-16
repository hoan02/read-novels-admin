import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { chapterColumns } from "@/components/chapter/ChapterColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { getChapters } from "@/lib/data/chapter.data";

const ListChapter = async ({ params }: { params: { novelSlug: string } }) => {
  const {
    data: chapters,
    message,
    status,
  } = await getChapters(params.novelSlug);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold">Danh sách chương</p>
        {/* <Link href={`/${params.novelSlug}/them-chuong`}>
          <Button className="flex gap-2 items-center">
            <PlusCircle size={20} /> Thêm chương mới
          </Button>
        </Link> */}
      </div>
      <DataTable columns={chapterColumns} data={chapters} searchKey="chapterName" />
    </div>
  );
};

export default ListChapter;
