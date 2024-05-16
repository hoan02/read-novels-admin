import { chapterColumns } from "@/components/chapter/ChapterColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { getUnapprovedChapters } from "@/lib/data/chapter.data";

const page = async () => {
  const { data: chaptersUnapproved, message, status } = await getUnapprovedChapters();
  if (status === 500) {
    return <>{message}</>;
  }
  if (status === 200) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Danh chương chờ duyệt</p>
        </div>
        <DataTable columns={chapterColumns} data={chaptersUnapproved} searchKey="chapterName" />
      </div>
    );
  }
};

export default page;

export const dynamic = "force-dynamic";
