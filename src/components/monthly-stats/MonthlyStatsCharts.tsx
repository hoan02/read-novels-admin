import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderByMonthChart from "../charts/OrderByMonthChart";
import { getAllMonthlyStats } from "@/lib/data/monthlyStats.data";

interface DataMonthlyStats {
  name: string;
  totalReadCount: number;
  totalNominationCount: number;
}

const MonthlyStatsCharts = async () => {
  const currentDate = new Date();
  const { data: dataMonthlyStats, status } = await getAllMonthlyStats(
    currentDate.getFullYear()
  );

  if (status === 200) {
    const dataRead = dataMonthlyStats.map((item: DataMonthlyStats) => ({
      name: item.name,
      value: item.totalReadCount,
    }));

    const dataNomination = dataMonthlyStats.map((item: DataMonthlyStats) => ({
      name: item.name,
      value: item.totalNominationCount,
    }));

    return (
      <Tabs defaultValue="read" className="w-full pb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="read">Lượt đọc</TabsTrigger>
          <TabsTrigger value="nomination">Đề cử</TabsTrigger>
        </TabsList>
        <TabsContent value="read">
          <Card className="p-4">
            <OrderByMonthChart label="lượt đọc" data={dataRead} />
          </Card>
        </TabsContent>
        <TabsContent value="nomination">
          <Card className="p-4">
            <OrderByMonthChart label="đề cử" data={dataNomination} />
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
  return <div>Error</div>;
};

export default MonthlyStatsCharts;
