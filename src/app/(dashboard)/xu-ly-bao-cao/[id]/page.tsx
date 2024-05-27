import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { Card } from "@/components/ui/card";
import { getReport } from "@/lib/data/report.data";
import FormReport from "@/components/report/FormReport";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const { data: report, message, status } = await getReport(params.id);
  if (status === 404) notFound();
  if (status === 500) {
    return <>{message}</>;
  }
  if (status === 200) {
    return (
      <div className="space-y-4">
        <Card className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-4">
            <div className="text-center font-semibold text-lg mb-4">
              Báo cáo
            </div>
            <div className="flex">
              <p className="w-[100px]">ID báo cáo:</p>
              <p>{report._id}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">Tiêu đề:</p>
              <p>{report.title}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">Nội dung:</p>
              <p>{report.content}</p>
            </div>
          </div>
          <div className="p-4 border-t-[1px] border-l-0 lg:border-l-[1px] lg:border-t-0">
            <div className="text-center font-semibold text-lg mb-4">
              Người tạo
            </div>
            <div className="flex">
              <p className="w-[100px]">Username:</p>
              <p>{report.userInfo.username}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">Email:</p>
              <p>{report.userInfo.email}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">Vai trò:</p>
              <p>{report.userInfo.role}</p>
            </div>
          </div>
        </Card>
        <Card className="grid grid-cols-1 lg:grid-cols-2">
          <FormReport reportData={report} />
          <div className="p-4 border-t-[1px] border-l-0 lg:border-l-[1px] lg:border-t-0">
            <div className="text-center font-semibold text-lg mb-4">
              Người trả lời
            </div>
            <div className="flex">
              <p className="w-[100px]">Username:</p>
              <p>{user?.fullName}</p>
            </div>
            <div className="flex">
              <p className="w-[100px]">Email:</p>
              <p>{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
};

export default Page;
