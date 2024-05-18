import formatDate from "@/utils/formatDate";
import AvatarFrame from "../custom-ui/AvatarFrame";

const UserInfo = ({ data }: { data: UserType }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl text-center my-6">Thông tin tài khoản</h1>
      <div className="lg:flex items-center shadow rounded-lg">
        <div className="flex flex-col p-2 lg:p-4 lg:w-1/4">
          <div className="mx-auto">
            {data.avatar && (
              <AvatarFrame
                src={data.avatar}
                frame={data.publicMetadata.frameAvatar}
                size={200}
                padding={6}
              />
            )}
          </div>
          <p className="text-center text-sm">
            {data.publicMetadata.frameAvatar}
          </p>
        </div>
        <div className="flex-1 p-2 lg:p-4 font-mono">
          <div className="flex flex-col">
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">First name</div>
              <div className="w-3/4 p-2 lg:p-4 border">{data.firstName}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Last name</div>
              <div className="w-3/4 p-2 lg:p-4 border">{data.lastName}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Username</div>
              <div className="w-3/4 p-2 lg:p-4 border">{data.username}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Email</div>
              <div className="w-3/4 p-2 lg:p-4 border">{data.email}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Vai trò</div>
              <div className="w-3/4 p-2 lg:p-4 border">{data.role}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Premium</div>
              <div className="w-3/4 p-2 lg:p-4 border">
                {data.publicMetadata.premium.state ? (
                  <div className="flex gap-4">
                    <p>{data.publicMetadata.frameAvatar}</p> |
                    <p className="font-semibold">
                      Từ{" "}
                      {formatDate(
                        data.publicMetadata.premium.startDate!!
                      ).slice(0, 10)}{" "}
                      đến{" "}
                      {formatDate(data.publicMetadata.premium.endDate!!).slice(
                        0,
                        10
                      )}
                    </p>
                  </div>
                ) : (
                  "Không"
                )}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 lg:p-4 border">Ngày tạo</div>
              <div className="w-3/4 p-2 lg:p-4 border">
                {formatDate(data.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
