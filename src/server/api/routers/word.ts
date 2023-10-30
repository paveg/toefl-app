import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const wordRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.word.findMany()
  }),
})
