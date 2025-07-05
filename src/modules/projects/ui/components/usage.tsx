import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { formatDuration, intervalToDuration } from "date-fns";
import { CrownIcon } from "lucide-react";
import Link from "next/link";

interface UsageProps {
  points: number;
  msBeforeNext: number;
}

export function Usage({ points, msBeforeNext }: UsageProps) {
  const { has } = useAuth();
  const hasProAccess = has?.({ plan: "pro" });

  return (
    <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center justify-between gap-x-2">
        <div className="">
          <p className="text-sm">{points} free credits remaining</p>
          <p className="text-xs text-muted-foreground">
            Resets in{" "}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Date.now() + msBeforeNext),
              }),
              {
                format: ["months", "days", "hours"],
              }
            )}
          </p>
        </div>
        {!hasProAccess && (
          <Button
            variant="default"
            size="sm"
            asChild
          >
            <Link href="/pricing">
              <CrownIcon className="w-4 h-4" /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
