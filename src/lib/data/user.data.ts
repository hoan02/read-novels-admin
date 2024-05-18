"use server";

import createResponse from "@/utils/createResponse";
import connectToDB from "../mongodb/mongoose";
import { auth } from "@clerk/nextjs/server";
import User from "../models/user.model";

export const getUserInfo = async (username: string) => {
  try {
    await connectToDB();
    const userInfo = await User.findOne({
      username,
    });
    if (!userInfo)
      return createResponse(null, "Không tìm thấy tài khoản này", 404);
    return createResponse(userInfo, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getUsers = async () => {
  const emailAdmin = process.env.EMAIL_ADMIN;
  try {
    await connectToDB();
    const userInfo = await User.find({
      email: { $ne: emailAdmin },
    });
    return createResponse(userInfo, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
