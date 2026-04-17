---
permalink: /labs/lab-08-dashboard/
title: "Lab 08: Power BI Dashboard"
description: "Connect to ADLS Gen2 data source and explore the APM Security Power BI report."
---

> 🇫🇷 **[Version française]({{ '/fr/labs/lab-08-dashboard/' | relative_url }})**

# Lab 08: Power BI Dashboard

| Duration | Level | Prerequisites |
|----------|-------|---------------|
| 40 min | Advanced | Lab 07 |

## Learning Objectives

- Deploy the Power BI PBIP report
- Connect to ADLS Gen2 data source
- Explore the 4 report pages

## Exercise 1: Run scan-and-store

> **Working Directory**: Run the following commands from the `apm-security-scan-demo-app` repository root.

```powershell
./scripts/scan-and-store.ps1 -StorageAccountName "<your-storage-account>"
```

## Exercise 2: Open the PBIP

Open `power-bi/APMSecurityReport.pbip` in Power BI Desktop.

## Exercise 3: Explore Report Pages

1. **Security Overview** — Total findings by severity, trends
2. **Unicode Analysis** — Glassworm/bidi findings by repo
3. **Attack Category Distribution** — OWASP LLM Top 10 mapping
4. **Engine Comparison** — Findings per engine, overlap analysis

## Verification Checkpoint

- [ ] Scan results are uploaded to ADLS Gen2
- [ ] Power BI report connects to the data source
- [ ] All 4 report pages render correctly

## Summary

Congratulations! You have completed all labs in the APM Security Scan Workshop. You now know how to:

- Detect hidden Unicode attacks in agent config files
- Verify lockfile integrity and policy compliance
- Scan for semantic threat patterns (Base64, URLs, shell injection, overrides)
- Validate MCP configurations against allowlists
- Upload SARIF to GitHub and ADO for unified reporting
- Build multi-engine CI/CD scan pipelines
