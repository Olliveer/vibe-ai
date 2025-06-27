"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");
  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => createProject.mutate({ value: text })}>
        {createProject.isPending ? "Invoking..." : "Invoke"}
      </Button>
    </div>
  );
}
