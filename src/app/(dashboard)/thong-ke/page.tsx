import { TimerReset } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  getAllMonthlyStats,
  getMonthlyStats,
} from "@/lib/data/monthlyStats.data";
import formatDate from "@/utils/formatDate";
import formatTimeAgo from "@/utils/formatTimeAgo";
import OrderByMonthChart from "@/components/charts/OrderByMonthChart";
import { getNominations } from "@/lib/data/nomination.data";

const viewPrice = 5;
const nominationPrice = 500;

const StatsPage = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());

  const [newNominationsResult, monthlyStatsResult, allMonthlyStatsResult] =
    await Promise.all([
      getNominations(startDate),
      getMonthlyStats(),
      getAllMonthlyStats(currentDate.getFullYear()),
    ]);

  const { data: newNominations } = newNominationsResult;
  const { data: monthlyStats } = monthlyStatsResult;
  const { data: dataChart } = allMonthlyStatsResult;

  const updateTime = monthlyStats?.updatedAt
    ? formatDate(monthlyStats?.updatedAt)
    : "";


  return (
    <div>
      <div className="text-xl font-semibold mx-6 flex justify-between items-center gap-4 border-b-[1px] mb-4 pb-1">
        Thống kê từ {startDate.toLocaleDateString()}
        <div className="flex text-muted-foreground text-sm items-center gap-1">
          <TimerReset size={16} />
          update: {updateTime}
        </div>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">Thu nhập</CardDescription>
                <Separator className="my-2" />
                <CardTitle className="flex justify-between py-2">
                  <div className="text-4xl">
                    {monthlyStats?.readCount * viewPrice +
                      newNominations?.length * nominationPrice}
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
                  {monthlyStats?.readCount}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="text-lg">Đề cử</CardDescription>
                <Separator className="my-2" />
                <CardTitle className="text-4xl py-2">
                  {newNominations?.length || 0}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card className="h-[396px]">
            <CardTitle className="m-3 text-xl">
              Biểu đồ lượt đọc năm {currentDate.getFullYear()}
            </CardTitle>
            <OrderByMonthChart label="lượt đọc" data={dataChart} />
          </Card>
        </div>
        <div>
          <ScrollArea className="h-[560px] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Đề cử mới
              </h4>

              <div className="space-y-2">
                {newNominations?.map((nomination: any, index: number) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-lg p-2 gap-2 flex"
                  >
                    <div className="flex-1 text-sm space-y-2">
                      <div>
                        Đọc giả: {nomination.user.firstName}{" "}
                        {nomination.user.lastName}
                      </div>
                      <div>Truyện: {nomination.novel.novelName}</div>
                    </div>
                    <div className="flex items-end">
                      <div className="text-xs mb-[2px]">
                        {formatTimeAgo(nomination.updatedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;

export const dynamic = "force-dynamic";
