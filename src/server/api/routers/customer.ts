import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.create({
        data: {
          kakaoID: input.id,
          joinedAt: new Date(),
          name: "",
          store: "",
        },
      });
      return true;
    }),
  getCustomerNumber: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clients.findMany({
        where: {
          userID: input.id,
        },
      });
      return user.length;
    }),
});
