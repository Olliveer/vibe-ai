import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  all: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project is required"),
      })
    )
    .query(async ({ input }) => {
      const messages = await db.message.findMany({
        where: {
          projectId: input.projectId,
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

  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Message is required")
          .max(10000, "Message is too long"),
        projectId: z.string().min(1, "Project is required"),
      })
    )
    .mutation(async ({ input }) => {
      const newMessage = await db.message.create({
        data: {
          content: input.value,
          role: "USER",
          type: "RESULT",
          projectId: input.projectId,
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
