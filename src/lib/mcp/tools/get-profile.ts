import { defineTool } from "@lovable.dev/mcp-js";
import { PROFILE, PROFILE_LINKS } from "../profile";

export default defineTool({
  name: "get_profile",
  title: "Get profile summary",
  description: "Get a summary of the public landing page: owner name, headline, site URL, and link count.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const summary = {
      ...PROFILE,
      linkCount: PROFILE_LINKS.length,
      platforms: PROFILE_LINKS.map((l) => l.platform),
    };
    return {
      content: [
        {
          type: "text" as const,
          text: `${summary.name} — ${summary.headline}\n${summary.siteUrl}\nPlatforms: ${summary.platforms.join(", ")}`,
        },
      ],
      structuredContent: summary,
    };
  },
});
