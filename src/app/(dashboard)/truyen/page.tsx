import { notFound } from "next/navigation";

import { DataTable } from "@/components/data-table/DataTable";
import { novelColumns } from "@/components/novel/NovelColumns";
import { getNovels } from "@/lib/data/novel.data";

const ListNovelPage = async () => {
  const { data: novels, message, status } = await getNovels();
  if (status === 404) notFound();
  if (status === 500) {
    return <>{message}</>;
  }
  if (status === 200) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Danh sách truyện</p>
        </div>
        <DataTable columns={novelColumns} data={novels} searchKey="novelName" />
      </div>
    );
  }
};

export default ListNovelPage;

export const dynamic = "force-dynamic";
