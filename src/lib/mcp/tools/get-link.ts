import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PROFILE_LINKS } from "../profile";

export default defineTool({
  name: "get_link",
  title: "Get a profile link",
  description: "Get the public URL and handle for one platform (e.g. instagram, youtube, whatsapp).",
  inputSchema: {
    platform: z.string().min(1).describe("Platform name, case-insensitive (e.g. 'instagram')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ platform }) => {
    const needle = platform.trim().toLowerCase();
    const link = PROFILE_LINKS.find((l) => l.platform.toLowerCase() === needle);
    if (!link) {
      throw new ToolError(
        `Unknown platform "${platform}". Available: ${PROFILE_LINKS.map((l) => l.platform).join(", ")}`,
      );
    }
    return {
      content: [{ type: "text" as const, text: `${link.platform} (${link.handle}): ${link.url}` }],
      structuredContent: { link },
    };
  },
});
