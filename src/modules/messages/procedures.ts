import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  all: baseProcedure.query(async () => {
    const messages = await db.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  }),

  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      const newMessage = await db.message.create({
        data: {
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
        },
      });

      return newMessage;
    }),
});
