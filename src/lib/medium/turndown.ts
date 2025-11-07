// Turndown service configuration for converting HTML to Markdown

import TurndownService from "turndown";
import { MEDIUM_URL_PREFIX } from "./constants";

// Initializes and configures the Turndown service with custom rules
export function initializeTurndownService(): TurndownService {
  const service = new TurndownService();

  service.addRule("code blocks", {
    filter: "pre",
    replacement: (content) => `\`\`\`\n${content}\n\`\`\``,
  });

  service.addRule("line breaks", {
    filter: "br",
    replacement: () => "\n",
  });

  service.addRule("mediumInlineLink", {
    filter: (node, options) => {
      return (
        options.linkStyle === "inlined" &&
        node.nodeName === "A" &&
        (node as HTMLElement).getAttribute("href") != null
      );
    },
    replacement: (content, node) => {
      let href = (node as HTMLElement).getAttribute("href");

      if (href?.startsWith("/")) {
        href = `${MEDIUM_URL_PREFIX}${href}`;
      }

      const title = (node as HTMLElement).title
        ? ` "${(node as HTMLElement).title}"`
        : "";

      return `[${content}](${href}${title})`;
    },
  });

  service.addRule("mediumFigure", {
    filter: "figure",
    replacement: (_, node) => {
      const source = node.querySelector("source");
      const srcset = source?.getAttribute("srcset") || "";
      const caption =
        node.querySelector("figcaption")?.textContent || "captionless image";

      if (srcset) {
        const srcList = srcset.split(" ");
        const bestQualityImgSrc = srcList[srcList.length - 2];
        return `![${caption}](${bestQualityImgSrc})`;
      }

      return `<b>[other]${caption}[/other]</b>`;
    },
  });

  service.keep(["iframe"]);

  return service;
}

// Create singleton instance
export const turndownService = initializeTurndownService();
