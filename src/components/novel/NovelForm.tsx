"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
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
import ImageUpload from "../custom-ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom-ui/Delete";
import { novelGenres } from "@/lib/constants";
import MultipleSelector, { Option } from "../custom-ui/MultipleSelector";
import NovelGuidelines from "./NovelGuidelines";
import {
  checkNovelName,
  createNovel,
  deleteNovel,
  updateNovel,
} from "@/lib/actions/novel.action";

const OPTIONS: Option[] = novelGenres.map((genre) => ({
  label: genre.name,
  value: genre.slug,
}));

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const formSchema = z.object({
  novelName: z
    .string()
    .min(5, { message: "Tên truyện phải chứa ít nhất 5 ký tự." })
    .max(150, { message: "Tên truyện không được vượt quá 150 ký tự." }),
  genres: z
    .array(optionSchema)
    .min(1, { message: "Phải chọn ít nhất một thể loại." }),
  author: z
    .string()
    .min(5, { message: "Tên tác giả phải chứa ít nhất 5 ký tự." })
    .max(50, { message: "Tên tác giả không được vượt quá 50 ký tự." }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải chứa ít nhất 10 ký tự." })
    .max(1000, { message: "Mô tả không được vượt quá 1000 ký tự." })
    .trim(),
  urlCover: z.string().url({ message: "Hãy chọn ảnh bìa." }),
});

interface NovelFormData {
  initialData?: {
    _id: string;
    novelName: string;
    genres: Option[];
    author: string;
    description: string;
    urlCover: string;
  } | null;
}

const NovelForm: React.FC<NovelFormData> = ({ initialData }) => {
  const router = useRouter();
  const [novelExists, setNovelExists] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          novelName: initialData.novelName,
          genres: initialData.genres,
          author: initialData.author,
          description: initialData.description,
          urlCover: initialData.urlCover,
        }
      : {
          novelName: "",
          genres: [],
          author: "",
          description: "",
          urlCover: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (novelExists) {
      toast.error(
        "Tên truyện đã tồn tại trên hệ thống! Vui lòng chọn tên khác!"
      );
      return;
    }

    const data = initialData
      ? {
          novelId: initialData._id,
          ...values,
        }
      : values;
    try {
      if (initialData) {
        await updateNovel(data);
        toast.success("Cập nhật truyện thành công");
      } else {
        await createNovel(data);
        toast.success("Thêm truyện thành công");
      }
      router.push("/danh-sach-truyen");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (novelId: string) => {
    try {
      const res: any = await deleteNovel(novelId);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      router.push("/danh-sach-truyen");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <NovelGuidelines />

      <div className="p-4 rounded-lg border">
        {initialData ? (
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Chỉnh sửa truyện</p>
            <Delete
              onDelete={() => handleDelete(initialData._id)}
              text={initialData.novelName}
            />
          </div>
        ) : (
          <p className="text-2xl font-semibold">Thêm truyện mới</p>
        )}

        <Separator className="my-4 bg-grey-1 mb-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="lg:flex gap-10">
              <div className="lg:w-2/3 lg:order-1 space-y-6 ">
                <FormField
                  control={form.control}
                  name="novelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên truyện</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          onBlur={async () => {
                            const novelName = form.getValues("novelName");
                            if (novelName !== initialData?.novelName) {
                              const result = await checkNovelName(novelName);
                              setNovelExists(result.found);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-red-500">
                        {novelExists && "Tên truyện đã tồn tại"}
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thể loại</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          value={field.value}
                          onChange={field.onChange}
                          defaultOptions={OPTIONS}
                          placeholder="Chọn thể loại truyện..."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên tác giả</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="lg:w-1/3 lg:order-2">
                <FormField
                  control={form.control}
                  name="urlCover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ảnh bìa</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="my-6" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NovelForm;
