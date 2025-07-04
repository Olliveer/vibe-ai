import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.auth.userId);
    const projects = await db.project.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "ID is required."),
      })
    )
    .query(async ({ input, ctx }) => {
      const projectExist = await db.project.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });

      if (!projectExist) {
        throw new TRPCError({
          message: "Project not found.",
          code: "NOT_FOUND",
        });
      }

      return projectExist;
    }),
  create: protectedProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Value is required")
          .max(10000, "Value is too long"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newProject = await db.project.create({
        data: {
          name: generateSlug(2, { format: "kebab" }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
          userId: ctx.auth.userId,
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: newProject.id,
        },
      });

      return newProject;
    }),
});
