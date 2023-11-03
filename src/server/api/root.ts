import { wordRouter } from "~/server/api/routers/word";
import { userWordRouter } from "~/server/api/routers/userWord";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  word: wordRouter,
  userWord: userWordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
