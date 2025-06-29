import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { Hint } from "@/components/hint";

interface Props {
  data: Fragment;
}

export default function FragmentWeb({ data }: Props) {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b-2 bg-sidebar flex items-center gap-x-2">
        <Hint
          text="Refresh"
          side="bottom"
          align="start"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCcwIcon />
          </Button>
        </Hint>
        <Hint
          text="Copy URL"
          side="bottom"
          align="center"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-1 justify-start text-start font-normal"
            disabled={!data.sandboxUrl || copied}
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint
          text="Open in new tab"
          side="bottom"
          align="start"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
            disabled={!data.sandboxUrl}
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  );
}
