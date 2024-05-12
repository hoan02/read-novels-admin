import Error from "@/components/layouts/Error";
import NovelForm from "@/components/novel/NovelForm";
import { getNovel } from "@/lib/data/novel.data";

const NovelDetailsPage = async ({
  params,
}: {
  params: { novelSlug: string };
}) => {
  const { data: novel, message, status } = await getNovel(params.novelSlug);
  if (status === 200) {
    return <NovelForm initialData={novel ? novel : []} />;
  } else {
    return <Error message={message} status={status} />;
  }
};

export default NovelDetailsPage;
