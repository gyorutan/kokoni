import { db } from "@/lib/db";

export const useCurrentUser = async (userId: string) => {
  await db.user.findUnique({ where: { id: userId } });
};
