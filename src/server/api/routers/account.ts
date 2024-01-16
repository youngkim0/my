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
  checkExistingNickname: publicProcedure
    .input(z.object({ nickname: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findMany({
        where: {
          nickname: input.nickname,
        },
      });
      return user.length !== 0 ? "true" : "false";
    }),
  updateAccount: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        naverPlace: z.string(),
        store: z.string(),
        description: z.string(),
        image: z.string(),
        nickname: z.string(),
        instagram: z.string(),
        blog: z.string(),
        youtube: z.string(),
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
          naverPlace: input.naverPlace,
          image: input.image,
          nickname: input.nickname,
          description: input.description,
          instagram: input.instagram,
          blog: input.blog,
          youtube: input.youtube,
        },
      });
      return user;
    }),
  getAllReviews: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const userNickName = await ctx.db.user.findUnique({
        where: {
          kakaoID: input.userID,
        },
      });

      const user = await ctx.db.clientReview.findMany({
        where: {
          userID: userNickName?.kakaoID,
        },
      });
      return user;
    }),
  getReviewByID: publicProcedure
    .input(z.object({ reviewID: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clientReview.findUnique({
        where: {
          id: input.reviewID,
        },
      });
      return user;
    }),
  addService: protectedProcedure
    .input(
      z.object({
        userID: z.string(),
        name: z.string(),
        content: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.service.create({
        data: {
          userID: input.userID,
          name: input.name,
          content: input.content,
          image: input.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return user;
    }),

  deleteService: protectedProcedure
    .input(
      z.object({
        serviceID: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.service.delete({
        where: {
          id: input.serviceID,
        },
      });
      return user;
    }),

  updateService: protectedProcedure
    .input(
      z.object({
        serviceID: z.string(),
        name: z.string(),
        content: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.service.update({
        where: {
          id: input.serviceID,
        },
        data: {
          name: input.name,
          content: input.content,
          image: input.image,
          updatedAt: new Date(),
        },
      });
      return user;
    }),
  getAllServices: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.service.findMany({
        where: {
          userID: input.userID,
        },
      });
      return user;
    }),
  getAllServicesByID: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const userID = await ctx.db.user.findUnique({
        where: {
          id: input.userID,
        },
      });
      if (!userID) throw new Error("User not found");
      const user = await ctx.db.service.findMany({
        where: {
          userID: userID.nickname,
        },
      });
      return user;
    }),
  getAllDesigners: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx }) => {
      const user = await ctx.db.user.findMany({});
      return user;
    }),
  deleteAccount: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
      return user;
    }),
});
