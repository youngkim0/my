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
        interestService: z.string(),
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
        },
      });
      return true;
    }),
});
