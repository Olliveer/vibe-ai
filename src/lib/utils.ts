import { TreeItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TreeNode {
  [key: string]: TreeNode | null;
}

export function convertFiltesToTreeItems(files: {
  [path: string]: string;
}): TreeItem[] {
  const tree: TreeNode = {};

  // Build the tree structure
  for (const path of Object.keys(files).sort()) {
    const parts = path.split("/");
    let current = tree;

    // Navigate/create the path in the tree
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as TreeNode;
    }

    // Add the file (leaf node)
    const fileName = parts[parts.length - 1];
    current[fileName] = null;
  }

  // Convert tree structure to TreeItem format
  function convertTreeNode(node: TreeNode): TreeItem[] {
    const result: TreeItem[] = [];

    for (const [key, value] of Object.entries(node)) {
      if (value === null) {
        // It's a file
        result.push(key);
      } else {
        // It's a folder with children
        const children = convertTreeNode(value);
        result.push([key, ...children]);
      }
    }

    return result;
  }

  return convertTreeNode(tree);
}
