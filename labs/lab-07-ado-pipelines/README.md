---
permalink: /labs/lab-07-ado-pipelines/
title: "Lab 07 ADO: YAML Pipelines — Multi-Engine Pipeline"
description: "Build a multi-engine APM Security scan pipeline in Azure DevOps YAML Pipelines."
---

> 🇫🇷 **[Version française](/fr/labs/lab-07-ado-pipelines)**

# Lab 07 ADO: YAML Pipelines — Multi-Engine Pipeline

| Duration | Level | Prerequisites |
|----------|-------|---------------|
| 50 min | Advanced | Lab 06 ADO |

## Learning Objectives

- Create ADO YAML pipelines for APM Security scanning
- Configure `AdvancedSecurity-Publish@1` for SARIF upload
- Set up variable groups and service connections

## Exercise 1: Review the ADO Scan Pipeline

```powershell
Get-Content .azuredevops\pipelines\apm-security-scan.yml
```

![ADO scan pipeline](../images/lab-07-ado/lab-07-ado-scan-pipeline.png)

## Exercise 2: Create the Pipeline in ADO

Navigate to **Pipelines > New Pipeline** and select the YAML file.

## Exercise 3: Review Variable Group

```powershell
Get-Content .azuredevops\pipelines\variables\common.yml
```

## Verification Checkpoint

- [ ] ADO scan pipeline runs all 3 stages
- [ ] SARIF results appear in Advanced Security
- [ ] Variable group is configured correctly

## Next Steps

Proceed to [Lab 08: Power BI Dashboard](../lab-08-dashboard/).
