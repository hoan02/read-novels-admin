"use server";

import connectToDB from "../mongodb/mongoose";
import createResponse from "@/utils/createResponse";
import Nomination from "../models/nomination.model";

export const getNominations = async (startDate: Date) => {
  try {
    await connectToDB();
    const nominations = await Nomination.aggregate([
      {
        $match: {
          updatedAt: { $gte: startDate },
        },
      },
      {
        $lookup: {
          from: "novels", // Assuming the collection name is 'novels'
          localField: "novelSlug",
          foreignField: "novelSlug",
          as: "novel",
        },
      },
      { $unwind: "$novel" },
      {
        $lookup: {
          from: "users",
          localField: "clerkId",
          foreignField: "clerkId",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          updatedAt: 1,
          novel: { novelName: 1 },
          user: { firstName: 1, lastName: 1 },
        },
      },
    ]);
    return createResponse(nominations, "Success!", 200);
  } catch (err) {
    console.log(err);
    return createResponse(null, "Error", 500);
  }
};
