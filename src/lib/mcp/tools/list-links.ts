import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROFILE_LINKS } from "../profile";

export default defineTool({
  name: "list_links",
  title: "List profile links",
  description: "List the public profile links shown on the landing page (social profiles and contact links).",
  inputSchema: {
    kind: z
      .enum(["all", "social", "contact"])
      .default("all")
      .describe("Filter links by kind. Defaults to all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ kind }) => {
    const links = kind === "all" ? PROFILE_LINKS : PROFILE_LINKS.filter((l) => l.kind === kind);
    return {
      content: [
        {
          type: "text" as const,
          text: links.map((l) => `${l.platform} (${l.handle}): ${l.url}`).join("\n"),
        },
      ],
      structuredContent: { links },
    };
  },
});
