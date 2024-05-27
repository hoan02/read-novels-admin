"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "@/lib/mongodb/mongoose";
import Report from "../models/report.model";

export const updateReport = async (reportId: string, params: any) => {
  try {
    await connectToDB();
    await Report.findByIdAndUpdate(reportId, params);
    revalidatePath(`/tai-khoan/ho-tro`);
    return { success: true, message: "Trả lời thành công!" };
  } catch (error) {
    console.error(error);
    throw new Error("Không thể trả lời báo cáo!");
  }
};
