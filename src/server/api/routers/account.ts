import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
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
  isRegistered: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          kakaoID: input.id,
        },
      });
      return user ? true : false;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
