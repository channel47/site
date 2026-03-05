---
name: "Paid Search"
description: "Deprecated — use the Google Ads and Microsoft Ads plugins instead. The combined paid-search plugin is frozen at v7.0.0."
type: "plugin"
author: "Jackson Dean"
source: "channel47"
tags: ["google-ads", "bing-ads", "paid-search", "deprecated", "plugin"]
featured: false
status: "dev"
compatibleWith: ["Claude Code"]
relatedTools: ["google-ads", "microsoft-ads"]
---

## Deprecated

The paid-search plugin is frozen at v7.0.0. It has been replaced by two dedicated plugins:

- **[Google Ads](/plugins/google-ads)** — 9 skills, Google-specific workflows, Performance Max transparency
- **[Microsoft Ads](/plugins/microsoft-ads)** — 8 skills, Bing-specific workflows, import auditing, MSAN cleanup

Install the replacements:

```
claude plugin install google-ads@channel47
claude plugin install microsoft-ads@channel47
```

The dedicated plugins have more skills, platform-specific intelligence, and no cross-platform context bloat. The paid-search plugin still works but receives no updates.
