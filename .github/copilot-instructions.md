---
description: "Workshop-wide Copilot instructions for the APM Security Scan Workshop"
applyTo: "**"
---

## Workshop Context

This is the APM Security Scan Workshop — a hands-on workshop for scanning agent configuration files for security vulnerabilities using 4 scanning engines.

## Scanning Engines

1. **Unicode Content Security** — `apm audit` detects hidden Unicode characters (Glassworm, bidi, zero-width)
2. **Lockfile Integrity** — `apm audit --ci` verifies dependency pinning and policy compliance
3. **Semantic Patterns** — `semantic-to-sarif.py` detects Base64, URLs, shell injection, prompt overrides
4. **MCP Configuration** — `mcp-to-sarif.py` validates mcp.json against server allowlists

## File Conventions

- Labs are in `labs/lab-XX-description/README.md`
- French translations are in `fr/labs/lab-XX-description/README.md`
- Screenshots are in `images/lab-XX/`
