import EditChapterForm from "@/components/chapter/EditChapterForm";
import Error from "@/components/layouts/Error";
import { getChapter } from "@/lib/data/chapter.data";
import { getNovel } from "@/lib/data/novel.data";

const NovelDetailsPage = async ({
  params,
}: {
  params: { novelSlug: string; chapterIndex: number };
}) => {
  const novelData = await getNovel(params.novelSlug);
  const chapterData = await getChapter(params.novelSlug, params.chapterIndex);
  const [novel, chapter] = await Promise.all([novelData, chapterData]);
  if (novel.status === 200 && chapter.status === 200) {
    return (
      <EditChapterForm dataNovel={novel.data} dataChapter={chapter.data} />
    );
  }
  return <Error />;
};

export default NovelDetailsPage;
