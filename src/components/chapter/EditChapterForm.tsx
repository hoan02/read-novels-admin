"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  chapterName: z.string().min(2).max(150),
  content: z.string().min(1).trim(),
});

interface EditChapterFormProps {
  dataNovel: NovelType | null;
  dataChapter: ChapterType | null;
}

const EditChapterForm: React.FC<EditChapterFormProps> = ({
  dataChapter,
  dataNovel,
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dataChapter || {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const chapterRequest = fetch(`/api/chapters/${dataChapter?._id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }, // Added headers for JSON content type
        body: JSON.stringify({ ...values }),
      });

      toast.promise(chapterRequest, {
        loading: "Loading...",
        success: `Chương đã được ${dataChapter ? "cập nhật" : "tạo mới"}`,
        error: "Có lỗi xảy ra! Vui lòng thử lại.",
      });

      const res = await chapterRequest;

      if (res.ok) {
        setTimeout(() => {
          router.push(`/novels/${dataNovel?._id}/list-chapter`);
        }, 1000);
      }
    } catch (error) {
      console.error("[chapters_POST]", error);
    }
  };

  return (
    <div>
      <div className="lg:w-full lg:order-1 space-y-6">
        <h1 className="text-lg py-4 text-center">
          [{dataNovel?.novelName}]-{dataNovel?.author}
        </h1>
        <h1 className="text-3xl text-center">
          Chương {String(dataChapter?.chapterIndex)}: {dataChapter?.chapterName}
        </h1>
        <div
          className="my-12"
          dangerouslySetInnerHTML={{
            __html: dataChapter?.content!,
          }}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button variant="default" className="my-10" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditChapterForm;