import { defineMcp } from "@lovable.dev/mcp-js";
import getLinkTool from "./tools/get-link";
import getProfileTool from "./tools/get-profile";
import listLinksTool from "./tools/list-links";

export default defineMcp({
  name: "landing-page-builder",
  title: "Landing Page Builder",
  version: "0.1.0",
  instructions:
    "Read-only tools for the public Anas Ayman landing page. Use `get_profile` for an overview, `list_links` to list all public profile links, and `get_link` to resolve one platform's URL.",
  tools: [getProfileTool, listLinksTool, getLinkTool],
});
