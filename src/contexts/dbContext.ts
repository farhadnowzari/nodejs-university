import { PrismaClient } from "../../generated/prisma";

const dbContext = new PrismaClient()

export default dbContext;