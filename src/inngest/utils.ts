import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, type Message, TextMessage } from "@inngest/agent-kit";
import { SANDBOX_TIMEOUT } from "./constants";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(SANDBOX_TIMEOUT);
  return sandbox;
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageIndex = result.output.findIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

export const parseAgentOutput = (value: Message[]) => {
  const output = value[0];
  if (output.type !== "text") {
    return "Fragment";
  }
  if (Array.isArray(output.content)) {
    return output.content.map((item) => item.text).join(" ");
  } else {
    return output.content;
  }
};
