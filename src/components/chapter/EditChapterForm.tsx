"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../custom-ui/TextEditor";

const formSchema = z.object({
  chapterName: z.string().min(2).max(150),
  content: z.string().min(1).trim(),
  // isLock: z.boolean(),
  // price: z.number(),
  // isPublic: z.boolean(),
});

interface EditChapterFormProps {
  dataNovel?: NovelType | null;
  dataChapter?: ChapterType | null;
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:w-full lg:order-1 space-y-6">
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chương</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <TextEditor
                    value={field.value}
                    onChange={(content) => field.onChange(content)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="isLock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa chương</FormLabel>
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá chương</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chương công khai</FormLabel>
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button className="bg-blue-1 text-white my-10" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditChapterForm;
