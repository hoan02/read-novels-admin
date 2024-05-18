import TermsOfService from "@/components/layouts/TermsOfService";
import MonthlyStatsCards from "@/components/monthly-stats/MonthlyStatsCards";
import MonthlyStatsCharts from "@/components/monthly-stats/MonthlyStatsCharts";
import NewNomination from "@/components/nomination/NewNomination";

export default function Dashboard() {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div>
      <div className="text-xl font-semibold mx-6 flex justify-between items-center gap-4 border-b-[1px] mb-4 pb-1">
        Thống kê từ {startDate.toLocaleDateString()}
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <MonthlyStatsCards />
          <div className="h-[396px]">
            <MonthlyStatsCharts />
          </div>
        </div>
        <NewNomination />
      </main>
    </div>
  );
}
