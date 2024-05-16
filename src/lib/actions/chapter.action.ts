"use server";

import { revalidatePath } from "next/cache";
import connectToDB from "@/lib/mongodb/mongoose";
import Chapter from "@/lib/models/chapter.model";
import Novel from "@/lib/models/novel.model";

export const createChapter = async (data: any) => {
  const { novelSlug, chapterName, chapterIndex, content, addChapterType } =
    data;
  try {
    await connectToDB();
    if (addChapterType === "insert") {
      const chaptersToUpdate = await Chapter.find({
        novelSlug,
        chapterIndex: { $gte: chapterIndex },
      });

      for (const chapter of chaptersToUpdate) {
        chapter.chapterIndex += 1;
        await chapter.save();
      }
    }

    const newChapter = await Chapter.create({
      novelSlug,
      chapterName,
      chapterIndex,
      content,
    });

    await Novel.findOneAndUpdate(
      { novelSlug },
      {
        $inc: { chapterCount: 1 },
      }
    );

    revalidatePath(`/truyen/${novelSlug}/danh-sach-chuong`);
    return { success: true, message: "Chương đã được tạo thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể tạo chương!");
  }
};

export const updateChapter = async (id: string, params: any) => {
  try {
    await connectToDB();
    const chapter = await Chapter.findByIdAndUpdate(id, params, {
      new: true,
      upsert: true,
    });
    if (!chapter) {
      throw new Error("Không tìm thấy chương!");
    }
    revalidatePath(`/truyen/${chapter.novelSlug}/danh-sach-chuong`);
    return { success: true, message: "Chương đã được cập nhật!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể cập nhật chương!");
  }
};

export const deleteChapter = async (chapterId: string, novelSlug: string) => {
  try {
    await connectToDB();
    const novel = await Novel.findOneAndUpdate(
      {
        novelSlug,
      },
      {
        $inc: { chapterCount: -1 },
      }
    );
    const chapter = await Chapter.findByIdAndDelete(chapterId);
    if (!chapter) {
      throw new Error("Không tìm thấy chương!");
    }
    revalidatePath(`/truyen/${novelSlug}/danh-sach-chuong`);
    return { success: true, message: "Chương đã được xóa!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể xóa chương!");
  }
};
