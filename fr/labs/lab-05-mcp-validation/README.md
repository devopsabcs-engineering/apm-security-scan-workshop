---
layout: default
title: "Labo 05 : Validation MCP"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-05-mcp-validation
---

> 🇬🇧 **[English version]({{ '/labs/lab-05-mcp-validation/' | relative_url }})**

# Labo 05 : Validation de configuration MCP

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 30 min | Intermédiaire | Labo 04 |

## Objectifs d'apprentissage

- Exécuter le validateur de configuration MCP
- Comprendre les listes d'autorisation de serveurs

## Exercice 1 : Analyser l'App 003

```powershell
python src\converters\mcp-to-sarif.py --scan-dir apm-demo-app-003 --output app003-mcp.sarif
```

## Point de vérification

- [ ] Le validateur MCP produit des résultats pour l'app 003

## Étapes suivantes

Passez au [Labo 06 : Onglet Sécurité GitHub](../lab-06-github-security-tab) ou [Labo 06 ADO](../lab-06-ado-advanced-security).
