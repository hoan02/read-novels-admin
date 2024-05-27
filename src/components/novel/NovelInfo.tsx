import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type NovelData = NovelType & {
  uploaderInfo: UserType;
};

const NovelInfo = ({ data }: { data: NovelData }) => {
  return (
    <div className="w-full border-[1px] rounded-lg">
      <h1 className="text-2xl text-center my-4">Thông tin truyện</h1>
      <div className="lg:flex lg:p-4 lg:gap-4 items-center">
        <div className="flex flex-col">
          <Image
            width={200}
            height={300}
            src={data.urlCover}
            alt="Cover"
            className="max-w-xs"
          />
        </div>
        <div className="flex-1 font-mono">
          <div className="flex flex-col">
            <div className="flex">
              <div className="w-1/4 p-2 border">Tên truyện</div>
              <div className="w-3/4 p-2 border">{data.novelName}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Thể loại</div>
              <div className="w-3/4 p-2 border flex gap-2">
                {data.genres.map((genre: any) => (
                  <Badge key={genre.value}>{genre.label}</Badge>
                ))}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Số chương</div>
              <div className="w-3/4 p-2 border">{data.chapterCount}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Lượt đọc</div>
              <div className="w-3/4 p-2 border">{data.readCount}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Đề cử</div>
              <div className="w-3/4 p-2 border">{data.nominationCount}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Tác giả</div>
              <div className="w-3/4 p-2 border">{data.author}</div>
            </div>
            <div className="flex">
              <div className="w-1/4 p-2 border">Người đăng</div>
              <div className="w-3/4 p-2 border flex justify-between">
                {data.uploaderInfo.username}
                <Link
                  className="text-blue-500 text-sm"
                  href={`/users/${data.uploaderInfo.username}`}
                >
                  (xem thêm)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="font-semibold">Mô tả:</div>
        <div>{data.description}</div>
      </div>
      <div className="p-4">
        <div className="font-semibold">
          Đánh giá: {data.reviews.avgScore}/10{" "}
          <Badge>có {data.reviews.count} đánh giá</Badge>
        </div>
        <ul className="list-disc ml-6">
          <li>Tính cách nhân vật: {data.reviews.avgScoreCharacter}</li>
          <li>Nội dung cốt truyện: {data.reviews.avgScorePlot}</li>
          <li>Bố cục thế giới: {data.reviews.avgScoreWorld}</li>
        </ul>
      </div>
    </div>
  );
};

export default NovelInfo;
