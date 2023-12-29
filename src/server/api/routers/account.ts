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
          nickname: "",
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

  getAccount: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          kakaoID: input.id,
        },
      });
      return user;
    }),
  getAccountByNickname: publicProcedure
    .input(z.object({ nickname: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findMany({
        where: {
          nickname: input.nickname,
        },
      });
      return user ? user[0] : null;
    }),
  updateAccount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        store: z.string(),
        image: z.string(),
        nickname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          kakaoID: input.id,
        },
        data: {
          name: input.name,
          store: input.store,
          image: input.image,
          nickname: input.nickname,
        },
      });
      return user;
    }),
});
