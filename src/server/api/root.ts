import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/account";
import { customerRouter } from "./routers/customer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  customer: customerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
