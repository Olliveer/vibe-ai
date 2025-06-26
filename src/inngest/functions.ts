import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const summarizer = createAgent({
      name: "summarizer",
      system:
        "You are an expert next.js developer. You write readable, concise, maintainable, and readable code. You write simple next.js & react snippets.",
      model: openai({ model: "gpt-4o" }),
    });

    // Run the agent with an input.  This automatically uses steps
    // to call your AI model.
    const { output } = await summarizer.run(
      `Write the following snippet: ${event.data.input}`
    );

    return { output };
  }
);
