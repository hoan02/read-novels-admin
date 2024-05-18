import Error from "@/components/layouts/Error";
import UserInfo from "@/components/user/UserInfo";
import { getUserInfo } from "@/lib/data/user.data";

const page = async ({ params }: { params: { username: string } }) => {
  const {
    data: dataUser,
    message,
    status,
  } = await getUserInfo(params.username);

  if (status === 200) return <UserInfo data={dataUser} />;
  return <Error message={message} status={status} />;
};

export default page;
