import { notFound } from "next/navigation";
import { getReports } from "@/lib/data/report.data";
import { DataTable } from "@/components/data-table/DataTable";
import { reportColumns } from "@/components/report/ReportColumns";

const ReportPage = async () => {
  const { data: novels, message, status } = await getReports();
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
        <DataTable
          columns={reportColumns}
          data={novels}
          searchKey="title"
          searchName="tên truyện"
        />
      </div>
    );
  }
};

export default ReportPage;
