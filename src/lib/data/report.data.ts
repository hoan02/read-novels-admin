"use server";

import mongoose from "mongoose";

import connectToDB from "@/lib/mongodb/mongoose";
import createResponse from "@/utils/createResponse";
import Report from "../models/report.model";

export const getReport = async (id: string) => {
  try {
    await connectToDB();

    const report = await Report.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
    ]);
    return createResponse(report[0], "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getReports = async () => {
  try {
    await connectToDB();
    const reports = await Report.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
    ]);
    return createResponse(reports, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
