"use server";

import connectToDB from "@/lib/mongodb/mongoose";
import createResponse from "@/utils/createResponse";
import MonthlyStats from "../models/monthlyStats.model";

interface StatResponse {
  name: string;
  value: number;
}

export const getMonthlyStats = async () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  try {
    await connectToDB();
    const aggregation = await MonthlyStats.aggregate([
      {
        $match: {
          month,
          year,
        },
      },
      {
        $group: {
          _id: null, // Group all records together
          totalReadCount: { $sum: "$readCount" }, // Sum up the readCount
        },
      },
      {
        $project: {
          readCount: "$totalReadCount",
        },
      },
    ]);

    const monthlyStats = aggregation.length > 0 ? aggregation[0] : null;

    if (!monthlyStats) {
      return createResponse(
        {
          readCount: 0,
        },
        "Success!",
        200
      );
    }

    return createResponse(monthlyStats, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};

export const getAllMonthlyStats = async (year: number) => {
  try {
    await connectToDB();
    const aggregation = await MonthlyStats.aggregate([
      {
        $match: {
          year: year,
        },
      },
      {
        $group: {
          _id: "$month",
          totalReadCount: { $sum: "$readCount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          name: {
            $concat: [
              { $toString: { $add: ["$_id", 1] } }, // Convert month to string and adjust for 1-indexed month
              "/",
              { $toString: year },
            ],
          },
          value: "$totalReadCount",
        },
      },
    ]);

    return createResponse(aggregation, "Success!", 200);
  } catch (err) {
    console.error(err);
    return createResponse(null, "Error", 500);
  }
};
