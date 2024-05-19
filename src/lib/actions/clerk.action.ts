"use server";

import { clerkClient } from "@clerk/nextjs/server";
import User from "../models/user.model";

export const updateRole = async (userId: string, role: string) => {
  try {
    const organizationId = process.env.CLERK_ORGANIZATION_ID;
    if (!organizationId) {
      console.log("CLERK_ORGANIZATION_ID is not set!");
      return false;
    }

    const [organizationUpdateResult, userUpdateResult] = await Promise.all([
      clerkClient.organizations.updateOrganizationMembership({
        organizationId,
        userId,
        role: `org:${role}`,
      }),
      User.findOneAndUpdate({ clerkId: userId }, { role }, { new: true }),
    ]);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
