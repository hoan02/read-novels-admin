import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNominations } from "@/lib/data/nomination.data";
import formatTimeAgo from "@/utils/formatTimeAgo";

const Loading = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
      <Skeleton className="h-[66px]" />
    </div>
  );
};

const NewNominationList = async () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth());

  const { data: nominations } = await getNominations(startDate);

  return (
    <div className="space-y-2">
      {nominations?.map((nomination: any, index: number) => (
        <div
          key={index}
          className="h-[66px] border-[1px] rounded-lg p-2 gap-2 flex"
        >
          <div className="flex-1 text-sm space-y-2">
            <div>
              Đọc giả: {nomination.user.firstName} {nomination.user.lastName}
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
  );
};

const NewNomination = () => {
  return (
    <ScrollArea className="h-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Đề cử mới</h4>

        <Suspense fallback={<Loading />}>
          <NewNominationList />
        </Suspense>
      </div>
    </ScrollArea>
  );
};

export default NewNomination;
