import Error from "@/components/layouts/Error";
import NovelInfo from "@/components/novel/NovelInfo";
import { getNovel } from "@/lib/data/novel.data";

const NovelDetailsPage = async ({
  params,
}: {
  params: { novelSlug: string };
}) => {
  const { data: novel, message, status } = await getNovel(params.novelSlug);

  console.log(novel);
  if (status === 200) {
    return <NovelInfo data={novel ? novel : []} />;
  } else {
    return <Error message={message} status={status} />;
  }
};

export default NovelDetailsPage;
