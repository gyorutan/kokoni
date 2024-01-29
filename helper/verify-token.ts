import { Payload } from "@/app/api/auth/login/route";
import { getUserById } from "@/data/user";
import jwt from "jsonwebtoken";

export const verifyToken = async (token: string) => {
  const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  const user = await getUserById(jwtPayload.id);
  if (!user) {
    return null;
  }
  return user;
};
