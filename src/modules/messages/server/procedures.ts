import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { consumeCredits } from "@/lib/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project is required"),
      })
    )
    .query(async ({ input, ctx }) => {
      const messages = await db.message.findMany({
        where: {
          projectId: input.projectId,
          project: {
            userId: ctx.auth.userId,
          },
        },
        include: {
          fragment: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return messages;
    }),

  create: protectedProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Message is required")
          .max(10000, "Message is too long"),
        projectId: z.string().min(1, "Project is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const projectExist = await db.project.findUnique({
        where: {
          id: input.projectId,
          userId: ctx.auth.userId,
        },
      });

      if (!projectExist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      try {
        await consumeCredits();
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Something went wrong!",
          });
        } else {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You have run out of credits.",
          });
        }
      }

      const newMessage = await db.message.create({
        data: {
          content: input.value,
          role: "USER",
          type: "RESULT",
          projectId: projectExist.id,
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: input.projectId,
        },
      });

      return newMessage;
    }),
});
