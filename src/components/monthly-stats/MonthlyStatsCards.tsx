import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMonthlyStats } from "@/lib/data/monthlyStats.data";

const viewPrice = 5;
const nominationPrice = 500;

const MonthlyStatsCards = async () => {
  const { data: dataMonthlyStats } = await getMonthlyStats();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2">
        <CardHeader className="pb-2">
          <CardDescription className="text-lg">Thu nhập</CardDescription>
          <Separator className="my-2" />
          <CardTitle className="flex justify-between py-2">
            <div className="text-4xl">
              {dataMonthlyStats?.readCount * viewPrice +
                dataMonthlyStats?.nominationCount * nominationPrice}
              <span className="text-xl">đ</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>1 lượt đọc = {viewPrice}đ</div>
              <div>1 đề cử = {nominationPrice}đ</div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="text-lg">Lượt đọc</CardDescription>
          <Separator className="my-2" />
          <CardTitle className="text-4xl py-2">
            {dataMonthlyStats?.readCount}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="text-lg">Đề cử</CardDescription>
          <Separator className="my-2" />
          <CardTitle className="text-4xl py-2">
            {dataMonthlyStats?.nominationCount}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MonthlyStatsCards;
