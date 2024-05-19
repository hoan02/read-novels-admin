"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import Novel from "@/lib/models/novel.model";
import createResponse from "@/utils/createResponse";
import User from "../models/user.model";

export const getNovel = async (novelSlug: string) => {
  try {
    await connectToDB();
    const novel = await Novel.findOne({
      novelSlug: novelSlug,
    });

    if (!novel) {
      return createResponse(null, "Không tìm thấy truyện!", 404);
    }

    const user = await User.findOne({ clerkId: novel.uploader });

    if (!user) {
      return createResponse(null, "Không tìm thấy thông tin người dùng!", 404);
    }

    const novelData = {
      ...novel.toObject(),
      uploaderInfo: user,
    };

    return createResponse(novelData, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getNovels = async () => {
  try {
    await connectToDB();
    const novels = await Novel.find();
    return createResponse(novels, "Success", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
