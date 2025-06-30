import { convertFiltesToTreeItems } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { CodeView } from "./code-view";
import { Hint } from "./hint";
import { TreeView } from "./tree-view";
import { Button } from "./ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type FileCollection = {
  [path: string]: string;
};

function getLanguageFromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLocaleLowerCase();

  return extension || "text";
}

interface FileExplorerProps {
  files: FileCollection;
}

function FileBreadcrumb({ filePath }: { filePath: string }) {
  const pathSegments = filePath.split("/");
  const maxSegments = 3;

  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <Fragment>
          <BreadcrumbItem>
            <span className="text-muted-foreground">{firstSegment}</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {lastSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Fragment>
      );
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
}

export function FileExplorer({ files }: FileExplorerProps) {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);

    return fileKeys.length > 0 ? fileKeys[0] : null;
  });

  const treeData = useMemo(() => {
    return convertFiltesToTreeItems(files);
  }, [files]);

  const handlFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile]);
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [selectedFile, files]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        defaultSize={30}
        minSize={30}
        className="bg-sidebar"
      >
        <TreeView
          data={treeData}
          value={selectedFile}
          onSelect={handlFileSelect}
        />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors" />
      <ResizablePanel
        defaultSize={70}
        minSize={50}
      >
        {selectedFile && files[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint text="Copy to clipboard">
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  disabled={copied}
                  onClick={handleCopy}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                code={files[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a file to view</p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
