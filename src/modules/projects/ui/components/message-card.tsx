import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import Image from "next/image";

interface Props {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isFragmentActive: boolean;
  type: MessageType;
  onFragmentClick: (fragment: Fragment) => void;
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted shadow-none border-none mx-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
}

function FragmentCard({
  fragment,
  isFragmentActive,
  onFragmentClick,
}: Pick<Props, "fragment" | "isFragmentActive" | "onFragmentClick">) {
  if (!fragment) return null;
  return (
    <button
      type="button"
      className={cn(
        "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
        isFragmentActive &&
          "bg-primary text-primary-foreground border-primary hover:bg-primary"
      )}
      onClick={() => onFragmentClick(fragment)}
    >
      <Code2Icon className="size-4 mt-0.5 " />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium line-clamp-1">
          {fragment.title}
        </span>
        <span className="text-sm">Preview</span>
      </div>
      <div className="flex items-center justify-center mt-0.5">
        <ChevronRightIcon className="size-4" />
      </div>
    </button>
  );
}

function AssistantMessage({
  content,
  fragment,
  createdAt,
  isFragmentActive,
  type,
  onFragmentClick,
}: Omit<Props, "role">) {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === MessageType.ERROR && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="Vibe AI Logo"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Vibe AI</span>
        <span className="text-xs opacity-0 transition-opacity duration-300 text-muted-foreground group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMMM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <span className="text-sm font-medium">{content}</span>
        {fragment && type === MessageType.RESULT && (
          <FragmentCard
            fragment={fragment}
            isFragmentActive={isFragmentActive}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  );
}

export default function MessageCard({
  content,
  role,
  fragment,
  createdAt,
  isFragmentActive,
  type,
  onFragmentClick,
}: Props) {
  if (role === MessageRole.ASSISTANT) {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        type={type}
        isFragmentActive={isFragmentActive}
        onFragmentClick={onFragmentClick}
      />
    );
  }

  return <UserMessage content={content} />;
}
