"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [text, setText] = useState("");
  const trpc = useTRPC();

  const { data: messages } = useQuery(trpc.messages.all.queryOptions());

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created.");
      },
    })
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => createMessage.mutate({ value: text })}>
        {createMessage.isPending ? "Invoking..." : "Invoke"}
      </Button>

      <div className="flex flex-col gap-2">
        {messages?.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
    </div>
  );
}
