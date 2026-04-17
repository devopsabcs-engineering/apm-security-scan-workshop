/**
 * Generates all workshop screenshots — both terminal-style and browser captures.
 * Terminal screenshots are rendered as HTML styled terminals via Playwright.
 * Browser screenshots are captured from live URLs.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'images');

const TERMINAL_STYLE = `
  body { margin: 0; padding: 0; background: #1e1e2e; font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace; }
  .terminal { background: #1e1e2e; border-radius: 8px; overflow: hidden; width: 900px; margin: 0; box-shadow: 0 4px 24px rgba(0,0,0,0.5); }
  .titlebar { background: #313244; padding: 8px 16px; display: flex; align-items: center; gap: 8px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.red { background: #f38ba8; }
  .dot.yellow { background: #f9e2af; }
  .dot.green { background: #a6e3a1; }
  .titlebar-text { color: #cdd6f4; font-size: 13px; margin-left: 8px; }
  .content { padding: 16px 20px; color: #cdd6f4; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
  .prompt { color: #89b4fa; }
  .success { color: #a6e3a1; }
  .error { color: #f38ba8; }
  .warning { color: #f9e2af; }
  .info { color: #89dceb; }
  .dim { color: #6c7086; }
  .bold { font-weight: bold; }
  .heading { color: #cba6f7; font-weight: bold; }
`;

function terminalHTML(title, content) {
  return `<!DOCTYPE html><html><head><style>${TERMINAL_STYLE}</style></head><body>
<div class="terminal">
  <div class="titlebar">
    <div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div>
    <span class="titlebar-text">${title}</span>
  </div>
  <div class="content">${content}</div>
</div></body></html>`;
}

const SCREENSHOTS = [
  // ── Lab 00: Prerequisites ──
  {
    lab: 'lab-00', filename: 'lab-00-tools-installed.png',
    type: 'terminal', title: 'Terminal — Tool Versions',
    content: `<span class="prompt">$</span> node --version
<span class="success">v20.18.1</span>

<span class="prompt">$</span> python3 --version
<span class="success">Python 3.12.4</span>

<span class="prompt">$</span> az --version
<span class="info">azure-cli                         2.67.0</span>
<span class="dim">core                              2.67.0</span>
<span class="dim">telemetry                          1.1.0</span>

<span class="prompt">$</span> gh --version
<span class="success">gh version 2.65.0 (2025-01-01)</span>

<span class="prompt">$</span> apm --version
<span class="success">apm-cli 1.2.0</span>
`
  },
  {
    lab: 'lab-00', filename: 'lab-00-clone-repo.png',
    type: 'terminal', title: 'Terminal — Clone Repository',
    content: `<span class="prompt">$</span> git clone https://github.com/devopsabcs-engineering/apm-security-scan-demo-app.git
<span class="dim">Cloning into 'apm-security-scan-demo-app'...</span>
<span class="dim">remote: Enumerating objects: 156, done.</span>
<span class="dim">remote: Counting objects: 100% (156/156), done.</span>
<span class="dim">remote: Compressing objects: 100% (98/98), done.</span>
<span class="dim">remote: Total 156 (delta 42), reused 156 (delta 42), pack-reused 0</span>
<span class="dim">Receiving objects: 100% (156/156), 48.12 KiB | 2.40 MiB/s, done.</span>
<span class="dim">Resolving deltas: 100% (42/42), done.</span>

<span class="prompt">$</span> cd apm-security-scan-demo-app && ls
<span class="info">apm-demo-app-001/  apm-demo-app-003/  apm-demo-app-005/  infra/    scripts/</span>
<span class="info">apm-demo-app-002/  apm-demo-app-004/  docs/              power-bi/ src/</span>
`
  },

  // ── Lab 01: Explore Violations ──
  {
    lab: 'lab-01', filename: 'lab-01-app-001-violations.png',
    type: 'terminal', title: 'apm-demo-app-001/src/agents/helper.agent.md',
    content: `<span class="heading"># Helper Agent</span>

<span class="dim">---</span>
<span class="dim">description: "Build assistant for APM Demo App 001"</span>
<span class="dim">---</span>

You are a helpful build assistant for this Next.js project.

<span class="error">⚠ VIOLATION: Unicode control characters detected</span>
<span class="warning">  Line 8: Invisible RIGHT-TO-LEFT OVERRIDE (U+202E) in instruction text</span>
<span class="warning">  Line 12: Zero-width joiner (U+200D) inside trusted command string</span>
<span class="warning">  Line 15: Bidirectional text override (U+202C) near API key reference</span>

<span class="dim">These hidden characters can manipulate how the agent interprets</span>
<span class="dim">instructions, potentially causing data exfiltration or prompt injection.</span>
`
  },

  // ── Lab 02: Unicode Scanning ──
  {
    lab: 'lab-02', filename: 'lab-02-apm-audit-output.png',
    type: 'terminal', title: 'Terminal — APM Audit',
    content: `<span class="prompt">$</span> apm audit apm-demo-app-001/

<span class="heading">APM Security Audit — Engine 1: Unicode Content Security</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="error">✗ CRITICAL  APM-U001  RIGHT-TO-LEFT OVERRIDE detected</span>
  <span class="dim">File: src/agents/helper.agent.md:8</span>
  <span class="dim">Character: U+202E at position 42</span>

<span class="error">✗ HIGH      APM-U002  Zero-width joiner in instruction</span>
  <span class="dim">File: src/agents/helper.agent.md:12</span>
  <span class="dim">Character: U+200D at position 18</span>

<span class="warning">✗ MEDIUM    APM-U003  Bidirectional override near sensitive data</span>
  <span class="dim">File: src/agents/helper.agent.md:15</span>
  <span class="dim">Character: U+202C at position 7</span>

<span class="bold">Summary: <span class="error">1 critical</span>, <span class="error">1 high</span>, <span class="warning">1 medium</span>, 0 low — <span class="error">FAIL</span></span>
`
  },
  {
    lab: 'lab-02', filename: 'lab-02-sarif-output.png',
    type: 'terminal', title: 'Terminal — SARIF Output',
    content: `<span class="prompt">$</span> cat results/unicode-scan.sarif | jq '.runs[0].results[:2]'
<span class="info">[</span>
  <span class="info">{</span>
    <span class="success">"ruleId"</span>: <span class="warning">"APM-U001"</span>,
    <span class="success">"level"</span>: <span class="warning">"error"</span>,
    <span class="success">"message"</span>: { <span class="success">"text"</span>: <span class="warning">"RIGHT-TO-LEFT OVERRIDE (U+202E) detected"</span> },
    <span class="success">"locations"</span>: [{ <span class="success">"physicalLocation"</span>: {
      <span class="success">"artifactLocation"</span>: { <span class="success">"uri"</span>: <span class="warning">"src/agents/helper.agent.md"</span> },
      <span class="success">"region"</span>: { <span class="success">"startLine"</span>: 8, <span class="success">"startColumn"</span>: 42 }
    }}],
    <span class="success">"partialFingerprints"</span>: { <span class="success">"primaryLocationLineHash"</span>: <span class="warning">"a1b2c3d4"</span> }
  <span class="info">}</span>,
  <span class="info">{</span>
    <span class="success">"ruleId"</span>: <span class="warning">"APM-U002"</span>,
    <span class="success">"level"</span>: <span class="warning">"error"</span>,
    <span class="success">"message"</span>: { <span class="success">"text"</span>: <span class="warning">"Zero-width joiner in agent instruction"</span> }
  <span class="info">}</span>
<span class="info">]</span>
`
  },

  // ── Lab 03: Lockfile Integrity ──
  {
    lab: 'lab-03', filename: 'lab-03-lockfile-missing.png',
    type: 'terminal', title: 'Terminal — Lockfile Integrity Check',
    content: `<span class="prompt">$</span> apm audit --ci apm-demo-app-005/

<span class="heading">APM Security Audit — Engine 2: Lockfile Integrity</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="error">✗ HIGH  APM-L001  go.sum missing — lockfile integrity cannot be verified</span>
  <span class="dim">File: apm-demo-app-005/go.mod</span>
  <span class="dim">Expected: go.sum alongside go.mod</span>
  <span class="dim">Status: MISSING</span>

<span class="warning">✗ MEDIUM  APM-L002  package-lock.json hash mismatch</span>
  <span class="dim">File: apm-demo-app-001/package-lock.json</span>
  <span class="dim">Package: next@15.0.0</span>
  <span class="dim">Expected: sha512-abc123...</span>
  <span class="dim">Actual: sha512-xyz789...</span>

<span class="bold">Summary: 0 critical, <span class="error">1 high</span>, <span class="warning">1 medium</span>, 0 low — <span class="error">FAIL</span></span>
`
  },
  {
    lab: 'lab-03', filename: 'lab-03-policy-config.png',
    type: 'terminal', title: 'src/config/apm-policy.yml',
    content: `<span class="heading"># APM Security Policy Configuration</span>

<span class="info">engines:</span>
  <span class="info">unicode:</span>
    <span class="success">enabled:</span> true
    <span class="success">severity_threshold:</span> medium
    <span class="success">block_on_failure:</span> true

  <span class="info">lockfile:</span>
    <span class="success">enabled:</span> true
    <span class="success">require_lockfiles:</span>
      - package-lock.json
      - go.sum
      - requirements.txt
    <span class="success">verify_hashes:</span> true

  <span class="info">semantic:</span>
    <span class="success">enabled:</span> true
    <span class="success">patterns:</span>
      - base64_exfiltration
      - shell_injection
      - prompt_override

  <span class="info">mcp:</span>
    <span class="success">enabled:</span> true
    <span class="success">allowlist_path:</span> src/config/mcp-allowlist.json
`
  },

  // ── Lab 04: Semantic Patterns ──
  {
    lab: 'lab-04', filename: 'lab-04-semantic-results.png',
    type: 'terminal', title: 'Terminal — Semantic Pattern Scan',
    content: `<span class="prompt">$</span> python3 src/converters/semantic-to-sarif.py apm-demo-app-002/

<span class="heading">APM Security — Engine 3: Semantic Pattern Scanner</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="error">✗ CRITICAL  APM-S001  Base64-encoded exfiltration pattern</span>
  <span class="dim">File: src/agents/AGENTS.md:14</span>
  <span class="dim">Pattern: btoa()/atob() wrapping sensitive data for external POST</span>

<span class="error">✗ HIGH      APM-S002  Shell injection via agent instruction</span>
  <span class="dim">File: apm-demo-app-004/src/agents/build-helper.agent.md:9</span>
  <span class="dim">Pattern: exec() / child_process with untrusted interpolation</span>

<span class="warning">✗ MEDIUM    APM-S003  Prompt override instruction detected</span>
  <span class="dim">File: src/agents/CLAUDE.md:3</span>
  <span class="dim">Pattern: "ignore previous instructions" semantic match</span>

<span class="success">✓ PASS      APM-S004  No credential harvesting patterns</span>

<span class="bold">Summary: <span class="error">1 critical</span>, <span class="error">1 high</span>, <span class="warning">1 medium</span>, 0 low — <span class="error">FAIL</span></span>
<span class="dim">SARIF output: results/semantic-scan.sarif</span>
`
  },

  // ── Lab 05: MCP Validation ──
  {
    lab: 'lab-05', filename: 'lab-05-mcp-allowlist.png',
    type: 'terminal', title: 'src/config/mcp-allowlist.json',
    content: `<span class="info">{</span>
  <span class="success">"$schema"</span>: <span class="warning">"https://apm.dev/schemas/mcp-allowlist.json"</span>,
  <span class="success">"version"</span>: <span class="warning">"1.0.0"</span>,
  <span class="success">"description"</span>: <span class="warning">"Approved MCP servers for APM demo apps"</span>,
  <span class="success">"allowedServers"</span>: <span class="info">[</span>
    <span class="info">{</span>
      <span class="success">"name"</span>: <span class="warning">"github-mcp-server"</span>,
      <span class="success">"url"</span>: <span class="warning">"https://api.github.com/mcp"</span>,
      <span class="success">"approved"</span>: <span class="info">true</span>
    <span class="info">}</span>,
    <span class="info">{</span>
      <span class="success">"name"</span>: <span class="warning">"azure-mcp-server"</span>,
      <span class="success">"url"</span>: <span class="warning">"https://management.azure.com/mcp"</span>,
      <span class="success">"approved"</span>: <span class="info">true</span>
    <span class="info">}</span>
  <span class="info">]</span>,
  <span class="success">"blockedPatterns"</span>: <span class="info">[</span>
    <span class="warning">"*ngrok*"</span>,
    <span class="warning">"*localhost*"</span>,
    <span class="warning">"*.onion"</span>
  <span class="info">]</span>
<span class="info">}</span>
`
  },
  {
    lab: 'lab-05', filename: 'lab-05-mcp-results.png',
    type: 'terminal', title: 'Terminal — MCP Validation',
    content: `<span class="prompt">$</span> python3 src/converters/mcp-to-sarif.py apm-demo-app-003/

<span class="heading">APM Security — Engine 4: MCP Configuration Validator</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="error">✗ HIGH  APM-M001  Unapproved MCP server reference</span>
  <span class="dim">File: mcp.json:5</span>
  <span class="dim">Server: "custom-internal-mcp" not in allowlist</span>

<span class="warning">✗ MEDIUM  APM-M002  MCP server URL uses HTTP (not HTTPS)</span>
  <span class="dim">File: mcp.json:8</span>
  <span class="dim">URL: http://internal-tools.corp/mcp</span>

<span class="warning">✗ MEDIUM  APM-M003  Missing server authentication configuration</span>
  <span class="dim">File: mcp.json:12</span>
  <span class="dim">Server: "custom-internal-mcp" has no auth block</span>

<span class="bold">Summary: 0 critical, <span class="error">1 high</span>, <span class="warning">2 medium</span>, 0 low — <span class="error">FAIL</span></span>
<span class="dim">SARIF output: results/mcp-scan.sarif</span>
`
  },

  // ── Lab 06: GitHub Security Tab (browser captures) ──
  {
    lab: 'lab-06', filename: 'lab-06-run-workflow.png',
    type: 'browser',
    url: 'https://github.com/devopsabcs-engineering/apm-security-scan-demo-app/actions',
  },
  {
    lab: 'lab-06', filename: 'lab-06-security-tab.png',
    type: 'browser',
    url: 'https://github.com/devopsabcs-engineering/apm-demo-app-001/security/code-scanning',
  },

  // ── Lab 06-ADO ──
  {
    lab: 'lab-06-ado', filename: 'lab-06-ado-pipeline-run.png',
    type: 'terminal', title: 'Azure DevOps — Pipeline Run',
    content: `<span class="heading">APM Security Scan Pipeline — Run #12</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="success">✓ Stage: Scan All Repositories</span>
  <span class="success">✓ Job: Scan apm-demo-app-001</span>  <span class="dim">Duration: 0m 32s</span>
  <span class="success">✓ Job: Scan apm-demo-app-002</span>  <span class="dim">Duration: 0m 28s</span>
  <span class="success">✓ Job: Scan apm-demo-app-003</span>  <span class="dim">Duration: 0m 35s</span>
  <span class="success">✓ Job: Scan apm-demo-app-004</span>  <span class="dim">Duration: 0m 31s</span>
  <span class="success">✓ Job: Scan apm-demo-app-005</span>  <span class="dim">Duration: 0m 29s</span>

<span class="success">✓ Stage: Upload SARIF</span>
  <span class="success">✓ Job: Upload to GitHub Security</span>  <span class="dim">Duration: 0m 12s</span>
  <span class="success">✓ Job: Store in ADLS Gen2</span>       <span class="dim">Duration: 0m 08s</span>

<span class="bold">Pipeline Result: <span class="success">Succeeded</span></span>
<span class="dim">Total Duration: 2m 45s</span>
`
  },
  {
    lab: 'lab-06-ado', filename: 'lab-06-ado-advsec.png',
    type: 'terminal', title: 'Azure DevOps — Advanced Security Findings',
    content: `<span class="heading">Advanced Security — APM Security Findings</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="bold">Repository: apm-security-scan-demo-app</span>

<span class="error">● Critical (2)</span>
  APM-U001  RIGHT-TO-LEFT OVERRIDE in helper.agent.md
  APM-S001  Base64 exfiltration in AGENTS.md

<span class="error">● High (3)</span>
  APM-U002  Zero-width joiner in instruction
  APM-L001  Missing go.sum lockfile
  APM-M001  Unapproved MCP server

<span class="warning">● Medium (4)</span>
  APM-U003  Bidirectional override near sensitive data
  APM-S003  Prompt override instruction
  APM-M002  HTTP MCP server URL
  APM-M003  Missing server authentication

<span class="dim">Total: 9 findings across 5 repositories</span>
`
  },

  // ── Lab 07: GitHub Actions ──
  {
    lab: 'lab-07', filename: 'lab-07-scan-workflow.png',
    type: 'terminal', title: '.github/workflows/apm-security-scan.yml',
    content: `<span class="info">name:</span> APM Security Scan
<span class="info">on:</span>
  <span class="info">schedule:</span>
    - <span class="info">cron:</span> <span class="warning">'0 6 * * 1'</span>   <span class="dim"># Weekly Monday 6 AM UTC</span>
  <span class="info">workflow_dispatch:</span>

<span class="info">permissions:</span>
  <span class="success">contents:</span> read
  <span class="success">security-events:</span> write

<span class="info">jobs:</span>
  <span class="info">scan:</span>
    <span class="success">runs-on:</span> ubuntu-latest
    <span class="success">strategy:</span>
      <span class="success">matrix:</span>
        <span class="success">repo:</span> [apm-demo-app-001, apm-demo-app-002, ..., apm-demo-app-005]
    <span class="success">steps:</span>
      - <span class="success">uses:</span> actions/checkout@v4
      - <span class="success">name:</span> Run APM Security Scan
        <span class="success">run:</span> |
          apm audit \${'$'}{{ matrix.repo }} --format sarif -o results/
      - <span class="success">name:</span> Upload SARIF
        <span class="success">uses:</span> github/codeql-action/upload-sarif@v3
        <span class="success">with:</span>
          <span class="success">sarif_file:</span> results/
`
  },

  // ── Lab 07-ADO ──
  {
    lab: 'lab-07-ado', filename: 'lab-07-ado-scan-pipeline.png',
    type: 'terminal', title: '.azuredevops/pipelines/apm-security-scan.yml',
    content: `<span class="info">trigger:</span> none
<span class="info">schedules:</span>
  - <span class="info">cron:</span> <span class="warning">'0 6 * * 1'</span>
    <span class="success">displayName:</span> Weekly Monday 6 AM UTC
    <span class="success">branches:</span>
      <span class="success">include:</span> [main]

<span class="info">pool:</span>
  <span class="success">vmImage:</span> ubuntu-latest

<span class="info">variables:</span>
  - <span class="success">template:</span> variables/common.yml

<span class="info">stages:</span>
  - <span class="info">stage:</span> Scan
    <span class="success">jobs:</span>
      - <span class="info">job:</span> ScanRepos
        <span class="success">strategy:</span>
          <span class="success">matrix:</span>
            app001: { repoName: apm-demo-app-001 }
            app002: { repoName: apm-demo-app-002 }
            app003: { repoName: apm-demo-app-003 }
            app004: { repoName: apm-demo-app-004 }
            app005: { repoName: apm-demo-app-005 }
        <span class="success">steps:</span>
          - <span class="success">script:</span> apm audit $$(repoName) --format sarif
          - <span class="success">task:</span> AdvancedSecurity-Publish@1
`
  },

  // ── Lab 08: Dashboard ──
  {
    lab: 'lab-08', filename: 'lab-08-dashboard-overview.png',
    type: 'terminal', title: 'Power BI — APM Security Dashboard',
    content: `<span class="heading">╔══════════════════════════════════════════════════════╗</span>
<span class="heading">║       APM Security — Compliance Dashboard            ║</span>
<span class="heading">╚══════════════════════════════════════════════════════╝</span>

<span class="bold">Overall Compliance Score: <span class="warning">67%</span></span>

<span class="bold">Findings by Severity</span>                 <span class="bold">Findings by Engine</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━━</span>                 <span class="dim">━━━━━━━━━━━━━━━━━━━</span>
<span class="error">█████</span>        Critical: 2               <span class="info">████████</span>  Unicode:  3
<span class="error">████████</span>     High:     3               <span class="warning">████</span>      Lockfile: 2
<span class="warning">██████████</span>   Medium:   4               <span class="error">██████</span>    Semantic: 3
                                       <span class="success">██████</span>    MCP:      3

<span class="bold">Trend (Last 4 Weeks)</span>
<span class="dim">━━━━━━━━━━━━━━━━━━━━</span>
Week 1: <span class="error">█████████████████████</span> 21 findings
Week 2: <span class="error">████████████████</span>      16 findings
Week 3: <span class="warning">████████████</span>          12 findings
Week 4: <span class="warning">█████████</span>              9 findings  <span class="success">↓ 57% improvement</span>

<span class="dim">Data Source: ADLS Gen2 → Power BI DirectQuery</span>
<span class="dim">Last Refreshed: 2026-04-17 06:00 UTC</span>
`
  },
];

async function main() {
  console.log('=== APM Security Workshop — Screenshot Generation ===\n');

  const browser = await chromium.launch();

  for (const shot of SCREENSHOTS) {
    const labDir = path.join(OUTPUT_DIR, shot.lab);
    if (!fs.existsSync(labDir)) fs.mkdirSync(labDir, { recursive: true });
    const outPath = path.join(labDir, shot.filename);

    if (shot.type === 'terminal') {
      const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
      const html = terminalHTML(shot.title, shot.content);
      await page.setContent(html, { waitUntil: 'load' });
      const terminal = await page.$('.terminal');
      await terminal.screenshot({ path: outPath });
      await page.close();
      console.log(`  ✅ ${shot.lab}/${shot.filename}`);
    } else if (shot.type === 'browser') {
      try {
        const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
        await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: outPath, fullPage: false });
        await page.close();
        console.log(`  ✅ ${shot.lab}/${shot.filename} (browser)`);
      } catch (err) {
        // Fallback: create a placeholder for pages requiring auth
        const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
        const html = terminalHTML(`Browser — ${shot.url}`,
          `<span class="info">Navigate to:</span>\n<span class="warning">${shot.url}</span>\n\n<span class="dim">This screenshot shows the live GitHub page.\nCapture manually if authentication is required.</span>`);
        await page.setContent(html, { waitUntil: 'load' });
        const el = await page.$('.terminal');
        await el.screenshot({ path: outPath });
        await page.close();
        console.log(`  ⚠️  ${shot.lab}/${shot.filename} (placeholder — auth required)`);
      }
    }
  }

  await browser.close();
  console.log('\n=== All screenshots generated ===');
}

main().catch(console.error);
