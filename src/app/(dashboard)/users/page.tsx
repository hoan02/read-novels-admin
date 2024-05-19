import { DataTable } from "@/components/data-table/DataTable";
import { userColumns } from "@/components/user/UserColumns";
import { getUsers } from "@/lib/data/user.data";
import { OrganizationList } from "@clerk/nextjs";

const page = async () => {
  const { data: users, message, status } = await getUsers();
  if (status === 500) {
    return <>{message}</>;
  }
  if (status === 200) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Danh sách tài khoản</p>
        </div>
        <DataTable
          columns={userColumns}
          data={users}
          searchKey="email"
          searchName="email"
        />
      </div>
    );
  }
};

export default page;

export const dynamic = "force-dynamic";
