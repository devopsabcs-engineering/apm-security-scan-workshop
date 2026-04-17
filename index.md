---
layout: default
title: Home
nav_order: 0
permalink: /
---

> 🇫🇷 **[Version française](fr/)**

<p align="center">
  <img src="{{ site.baseurl }}/assets/branding/logo-128.png" alt="Agentic Accelerator Framework" width="100">
</p>

# APM Security Scan Workshop

Welcome to the **APM Security Scan Workshop** — a hands-on, progressive workshop that teaches you how to secure the agent configuration files (`.agent.md`, `.instructions.md`, `.prompt.md`, `SKILL.md`, `mcp.json`) that AI coding agents auto-consume as trusted system instructions.

> [!NOTE]
> This workshop is part of the [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework).

You will scan five demo applications using a **4-engine scanning architecture**: Unicode content security (`apm audit`), lockfile integrity (`apm audit --ci`), semantic pattern scanning, and MCP configuration validation. All results are normalized to [SARIF v2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) for unified reporting in GitHub Advanced Security or Azure DevOps Advanced Security.

## Architecture Overview

```mermaid
graph TB
    subgraph "Demo Apps"
        A1["apm-demo-app-001<br/>Next.js / Copilot Agents"]
        A2["apm-demo-app-002<br/>Flask / Claude Agents"]
        A3["apm-demo-app-003<br/>ASP.NET / MCP Servers"]
        A4["apm-demo-app-004<br/>Spring Boot / Skills"]
        A5["apm-demo-app-005<br/>Go / Multi-Agent"]
    end

    subgraph "4-Engine Scanner Architecture"
        E1["Engine 1: apm audit<br/>Unicode Content Security"]
        E2["Engine 2: apm audit --ci<br/>Lockfile Integrity"]
        E3["Engine 3: Semantic Scanner<br/>Patterns & Secrets"]
        E4["Engine 4: MCP Validator<br/>Server Allowlist"]
    end

    subgraph "SARIF Pipeline"
        S1["Native SARIF<br/>(Engines 1+2)"]
        S2["semantic-to-sarif.py"]
        S3["mcp-to-sarif.py"]
        U["Unified SARIF Results"]
    end

    subgraph "Reporting"
        GH["GitHub Security Tab"]
        ADO["ADO Advanced Security"]
        PBI["Power BI Dashboard"]
    end

    A1 & A2 & A3 & A4 & A5 --> E1 & E2 & E3 & E4
    E1 & E2 --> S1
    E3 --> S2
    E4 --> S3
    S1 & S2 & S3 --> U
    U --> GH & ADO & PBI
```

## Labs

| Lab | Topic | Duration | Platform |
|-----|-------|----------|----------|
| [Lab 00](labs/lab-00-prerequisites/) | Prerequisites & Environment Setup | 30 min | Agnostic |
| [Lab 01](labs/lab-01-explore-violations/) | Explore Demo Apps & Violations | 25 min | Agnostic |
| [Lab 02](labs/lab-02-unicode-scanning/) | Unicode Content Security Scanning | 35 min | Agnostic |
| [Lab 03](labs/lab-03-lockfile-integrity/) | Lockfile Integrity & Policy Checks | 30 min | Agnostic |
| [Lab 04](labs/lab-04-semantic-patterns/) | Semantic Pattern Scanner | 35 min | Agnostic |
| [Lab 05](labs/lab-05-mcp-validation/) | MCP Configuration Validation | 30 min | Agnostic |
| [Lab 06](labs/lab-06-github-security-tab/) | GitHub Security Tab — SARIF Upload | 30 min | GitHub |
| [Lab 06 ADO](labs/lab-06-ado-advanced-security/) | ADO Advanced Security — SARIF Upload | 35 min | ADO |
| [Lab 07](labs/lab-07-github-actions/) | GitHub Actions — Multi-Engine Pipeline | 45 min | GitHub |
| [Lab 07 ADO](labs/lab-07-ado-pipelines/) | ADO Pipelines — Multi-Engine Pipeline | 50 min | ADO |
| [Lab 08](labs/lab-08-dashboard/) | Power BI Dashboard | 40 min | Agnostic |

## Related Repositories

| Repository | Description |
|------------|-------------|
| [agentic-accelerator-framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework) | Framework agents, instructions, and skills |
| [apm-security-scan-demo-app](https://github.com/devopsabcs-engineering/apm-security-scan-demo-app) | Scanner platform and demo applications |
| [agentic-accelerator-workshop](https://github.com/devopsabcs-engineering/agentic-accelerator-workshop) | Main workshop (all domains) |
| [accessibility-scan-workshop](https://devopsabcs-engineering.github.io/accessibility-scan-workshop/) | Accessibility scanning workshop |
| [code-quality-scan-workshop](https://devopsabcs-engineering.github.io/code-quality-scan-workshop/) | Code quality scanning workshop |
| [finops-scan-workshop](https://devopsabcs-engineering.github.io/finops-scan-workshop/) | FinOps scanning workshop |
