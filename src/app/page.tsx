"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [text, setText] = useState("");
  const trpc = useTRPC();

  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Invoked");
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
      <Button onClick={() => invoke.mutate({ value: text })}>
        {invoke.isPending ? "Invoking..." : "Invoke"}
      </Button>
    </div>
  );
}
