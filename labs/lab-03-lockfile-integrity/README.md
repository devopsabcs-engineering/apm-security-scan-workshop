---
permalink: /labs/lab-03-lockfile-integrity/
title: "Lab 03: Lockfile Integrity & Policy Checks"
description: "Use apm audit --ci to verify lockfile integrity, version pinning, and organizational policy compliance."
---

> 🇫🇷 **[Version française](/fr/labs/lab-03-lockfile-integrity)**

# Lab 03: Lockfile Integrity & Policy Checks

| Duration | Level | Prerequisites |
|----------|-------|---------------|
| 30 min | Intermediate | Lab 02 |

## Learning Objectives

- Run `apm audit --ci` lockfile verification
- Understand the 6 baseline checks and 16 policy checks
- Detect unpinned dependencies and missing lockfiles

## Exercise 1: Check App 005 (Missing Lockfile)

> **Working Directory**: Run the following commands from the `apm-security-scan-demo-app` repository root.

```powershell
cd apm-demo-app-005
apm audit --ci
```

This should fail because app 005 has no `apm.lock.yaml` committed.

![Lockfile missing](../images/lab-03/lab-03-lockfile-missing.png)

## Exercise 2: Generate a Lockfile

```powershell
apm install
```

Then re-run the audit:

```powershell
apm audit --ci
```

## Exercise 3: Review Policy Configuration

```powershell
Get-Content ..\src\config\apm-policy.yml
```

![Policy config](../images/lab-03/lab-03-policy-config.png)

## Exercise 4: SARIF Output

```powershell
apm audit --ci -f sarif -o apm-lockfile-results.sarif
```

## Verification Checkpoint

- [ ] `apm audit --ci` detects the missing lockfile in app 005
- [ ] You understand the 6 baseline checks
- [ ] You can interpret lockfile-related SARIF findings

## Next Steps

Proceed to [Lab 04: Semantic Pattern Scanner](../lab-04-semantic-patterns/).
