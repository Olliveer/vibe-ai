import { inngest } from "@/inngest/client";
import { db } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
  all: baseProcedure.query(async () => {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string().min(1, "ID is required."),
      })
    )
    .query(async ({ input }) => {
      const projectExist = await db.project.findUnique({
        where: {
          id: input.id,
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
  create: baseProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, "Value is required")
          .max(10000, "Value is too long"),
      })
    )
    .mutation(async ({ input }) => {
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
