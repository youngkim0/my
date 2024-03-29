import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
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
  getCustomerNumerByNickname: publicProcedure
    .input(z.object({ nickname: z.string() }))
    .query(async ({ ctx, input }) => {
      const id = await ctx.db.user.findMany({
        where: {
          nickname: input.nickname,
        },
      });
      const user = await ctx.db.clients.findMany({
        where: {
          userID: id[0]?.kakaoID,
        },
      });
      return user.length;
    }),
  getCustomerList: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clients.findMany({
        where: {
          userID: input.id,
        },
      });
      return user;
    }),
  getCustomerListByID: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userID = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (userID) {
        const user = await ctx.db.clients.findMany({
          where: {
            userID: userID.kakaoID,
          },
        });
        return user;
      }
      return false;
    }),
  addNewCustomer: publicProcedure
    .input(
      z.object({
        userID: z.string(),
        name: z.string(),
        gender: z.string(),
        phoneNumber: z.string(),
        birth: z.string(),
        visitPath: z.string(),
        hairThickness: z.string(),
        hairType: z.string(),
        hairFerm: z.string(),
        hairDye: z.string(),
        hairClinic: z.string(),
        hairStyle: z.string(),
        interestService: z.string().array(),
        scalpType: z.string(),
        dandruff: z.string(),
        hairLoss: z.string(),
        sensitiveScalp: z.string(),
        tensionScalp: z.string(),
        memo: z.string(),
        important: z.string().array(),
        styleConcept: z.string().array(),
        importantHair: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clients.create({
        data: {
          userID: input.userID,
          name: input.name,
          phoneNumber: input.phoneNumber,
          gender: input.gender,
          birth: input.birth,
          visitPath: input.visitPath,
          hairThickness: input.hairThickness,
          hairType: input.hairType,
          hairFerm: input.hairFerm,
          hairDye: input.hairDye,
          hairClinic: input.hairClinic,
          hairStyle: input.hairStyle,
          interestService: input.interestService,
          scalpType: input.scalpType,
          dandruff: input.dandruff,
          hairLoss: input.hairLoss,
          sensitiveScalp: input.sensitiveScalp,
          tensionScalp: input.tensionScalp,
          memo: input.memo,
          important: input.important,
          styleConcept: input.styleConcept,
          importantHair: input.importantHair,
          createdAt: new Date(),
        },
      });
      return true;
    }),
  deleteCustomer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clients.delete({
        where: {
          id: input.id,
        },
      });
      return true;
    }),
  editCustomer: publicProcedure
    .input(
      z.object({
        customerID: z.string(),
        name: z.string(),
        gender: z.string(),
        phoneNumber: z.string(),
        birth: z.string(),
        visitPath: z.string(),
        hairThickness: z.string(),
        hairType: z.string(),
        hairFerm: z.string(),
        hairDye: z.string(),
        hairClinic: z.string(),
        hairStyle: z.string(),
        interestService: z.string().array(),
        scalpType: z.string(),
        dandruff: z.string(),
        hairLoss: z.string(),
        sensitiveScalp: z.string(),
        tensionScalp: z.string(),
        memo: z.string(),
        important: z.string().array(),
        styleConcept: z.string().array(),
        importantHair: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clients.update({
        where: {
          id: input.customerID,
        },
        data: {
          name: input.name,
          phoneNumber: input.phoneNumber,
          gender: input.gender,
          birth: input.birth,
          visitPath: input.visitPath,
          hairThickness: input.hairThickness,
          hairType: input.hairType,
          hairFerm: input.hairFerm,
          hairDye: input.hairDye,
          hairClinic: input.hairClinic,
          hairStyle: input.hairStyle,
          interestService: input.interestService,
          scalpType: input.scalpType,
          dandruff: input.dandruff,
          hairLoss: input.hairLoss,
          sensitiveScalp: input.sensitiveScalp,
          tensionScalp: input.tensionScalp,
          memo: input.memo,
          important: input.important,
          styleConcept: input.styleConcept,
          importantHair: input.importantHair,
        },
      });
      return true;
    }),
  checkCustomer: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phoneNumber: z.string(),
        userNickname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userID = await ctx.db.user.findFirst({
        where: {
          nickname: input.userNickname,
        },
      });

      const user = await ctx.db.clients.findMany({
        where: {
          name: input.name,
          userID: userID?.kakaoID,
        },
      });
      for (const u of user) {
        if (
          u.phoneNumber.slice(u.phoneNumber.length - 4) === input.phoneNumber
        ) {
          return { clientID: u.id, userID: u.userID };
        }
      }

      return false;
    }),
  getCustomerInfo: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clients.findUnique({
        where: {
          id: input.id,
        },
      });

      return user;
    }),
  addCustomerMemo: publicProcedure
    .input(
      z.object({
        customerID: z.string(),
        userID: z.string(),
        memo: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clientMemo.create({
        data: {
          clientID: input.customerID,
          userID: input.userID,
          memo: input.memo,
          createdAt: new Date(),
          updatedAt: new Date(),
          image: input.image,
        },
      });
      return true;
    }),

  getCustomerMemo: publicProcedure
    .input(z.object({ userID: z.string(), clientID: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clientMemo.findMany({
        where: {
          clientID: input.clientID,
          userID: input.userID,
        },
      });
      console.log(input.clientID, input.userID, user);
      return user;
    }),

  addCustomerConsult: publicProcedure
    .input(
      z.object({
        customerID: z.string(),
        userID: z.string(),
        memo: z.string(),
        front1: z.string(),
        side1: z.string(),
        front2: z.string(),
        side2: z.string(),
        consultTitle: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clientConsult.create({
        data: {
          clientID: input.customerID,
          userID: input.userID,
          memo: input.memo,
          createdAt: new Date(),
          updatedAt: new Date(),
          front1: input.front1,
          side1: input.side1,
          front2: input.front2,
          side2: input.side2,
          replied: false,
          reply: "",
          reviewed: false,
        },
      });
      await ctx.db.clients.update({
        where: {
          id: input.customerID,
        },
        data: {
          recentConsult: input.consultTitle,
          recentConsultDate: new Date().toLocaleString(),
        },
      });
      return true;
    }),
  getCustomerConsultList: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clientConsult.findMany({
        where: {
          userID: input.userID,
        },
      });
      return user;
    }),
  getCustomerConsultListByID: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const userID = await ctx.db.user.findUnique({
        where: {
          id: input.userID,
        },
      });
      if (userID) {
        const user = await ctx.db.clientConsult.findMany({
          where: {
            userID: userID.kakaoID,
          },
        });
        return user;
      }
      return false;
    }),
  getCustomerConsultListForCustomer: publicProcedure
    .input(z.object({ userID: z.string(), clientID: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.clientConsult.findMany({
        where: {
          userID: input.userID,
          clientID: input.clientID,
        },
      });
      return user;
    }),
  replyCustomerConsult: publicProcedure
    .input(z.object({ consultID: z.string(), reply: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clientConsult.update({
        where: {
          id: input.consultID,
        },
        data: {
          replied: true,
          reply: input.reply,
        },
      });
      return true;
    }),
  addNewReview: publicProcedure
    .input(
      z.object({
        userID: z.string(),
        clientID: z.string(),
        review: z.string(),
        image: z.string(),
        consultID: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clientReview.create({
        data: {
          clientID: input.clientID,
          userID: input.userID,
          review: input.review,
          createdAt: new Date(),
          updatedAt: new Date(),
          image: input.image,
        },
      });
      await ctx.db.clientConsult.update({
        where: {
          id: input.consultID,
        },
        data: {
          reviewed: true,
        },
      });

      return true;
    }),
  getReviewsByID: publicProcedure
    .input(z.object({ userID: z.string() }))
    .query(async ({ ctx, input }) => {
      const userID = await ctx.db.user.findUnique({
        where: {
          id: input.userID,
        },
      });
      if (!userID) return false;
      const user = await ctx.db.clientReview.findMany({
        where: {
          userID: userID.kakaoID,
        },
      });
      return user;
    }),

  deleteReview: publicProcedure
    .input(z.object({ reviewID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.clientReview.delete({
        where: {
          id: input.reviewID,
        },
      });
      return true;
    }),
});
