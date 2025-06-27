import { serve } from "inngest/next";
import { codeAgentFunction } from "@/inngest/functions";
import { inngest } from "@/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    codeAgentFunction,
  ],
});
