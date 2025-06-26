import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        value: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await inngest.send({
          name: "test/hello.world",
          data: { input: input.value },
        });
        return { success: true };
      } catch (error) {
        throw new Error(
          `Failed to send event: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
