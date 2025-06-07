import { PrismaClient } from "../../app/generated/prisma";

export const db = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
