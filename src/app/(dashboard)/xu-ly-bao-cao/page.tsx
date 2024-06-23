import { notFound } from "next/navigation";
import { getReports } from "@/lib/data/report.data";
import { DataTable } from "@/components/data-table/DataTable";
import { reportColumns } from "@/components/report/ReportColumns";

const ReportPage = async () => {
  const { data: reports, message, status } = await getReports();
  if (status === 404) notFound();
  if (status === 500) {
    return <>{message}</>;
  }

  if (status === 200) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Danh sách báo cáo</p>
        </div>
        <DataTable
          columns={reportColumns}
          data={reports}
          searchKey="title"
          searchName="tiêu đề"
        />
      </div>
    );
  }
};

export default ReportPage;
