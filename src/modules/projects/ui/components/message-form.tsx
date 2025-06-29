import { useState } from "react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  projectId: string;
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, "Message is required")
    .max(10000, "Message is too long"),
});

export default function MessageForm({ projectId }: Props) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [isFocused, setIsFocused] = useState(false);
  const showUsage = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createMessageMutation = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created");
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.all.queryOptions({ projectId })
        );

        // TODO INVALIDATE USAGE
      },
      onError: (error) => {
        // TODO: handle error
        toast.error(error.message);
      },
    })
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createMessageMutation.mutateAsync({
      value: data.value,
      projectId,
    });
  };

  const isPending = createMessageMutation.isPending;
  const isDisabled = !form.formState.isValid || isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <TextareaAutosize
                {...field}
                disabled={isPending}
                className="resize-none pt-4 border-none w-full outline-none bg-transparent"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                minRows={2}
                maxRows={8}
                placeholder="What do you want to build?"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>⌘</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            type="submit"
            disabled={isDisabled}
            className={cn(
              "size-8 rounded-full",
              isDisabled && "bg-muted-foreground border"
            )}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
