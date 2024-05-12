import { getNovel } from "@/lib/data/novel.data";
import { notFound } from "next/navigation";
import CreateChapterForm from "@/components/chapter/CreateChapterForm";

const CreateChapterPage = async ({
  params,
}: {
  params: { novelSlug: string };
}) => {
  const { data: novel, message, status } = await getNovel(params.novelSlug);
  if (status === 404) {
    notFound();
  }

  return (
    <>
      <p className="text-lg mb-4">
        [{novel?.novelName}] - {novel?.chapterCount} chương
      </p>
      <CreateChapterForm dataNovel={novel} />
    </>
  );
};

export default CreateChapterPage;
