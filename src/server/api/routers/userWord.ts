import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userWordRouter = createTRPCRouter({
  getAllByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.userWord.findMany({
      where: {
        userId: input.userId
      }
    })
  }),
  createByWordId: publicProcedure.input(z.object({
    userId: z.string(),
    wordId: z.string(),
  })).mutation(({ ctx, input }) => {
    const newRecord = ctx.db.userWord.create({
      data: {
        userId: input.userId,
        wordId: input.wordId,
      }
    })
    return newRecord
  }),
  deleteById: publicProcedure.input(z.object({
    id: z.string(),
  })).mutation(({ ctx, input }) => {
    return ctx.db.userWord.delete({
      where: {
        id: input.id,
      }
    })
  })
})
