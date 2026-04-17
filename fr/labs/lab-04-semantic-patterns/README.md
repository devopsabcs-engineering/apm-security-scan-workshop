---
layout: default
title: "Labo 04 : Motifs sémantiques"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-04-semantic-patterns/
---

> 🇬🇧 **[English version]({{ '/labs/lab-04-semantic-patterns/' | relative_url }})**

# Labo 04 : Analyse de motifs sémantiques

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 35 min | Intermédiaire | Labo 03 |

## Objectifs d'apprentissage

- Exécuter le scanner de motifs sémantiques
- Comprendre les identifiants de règles APM-SEC et leurs correspondances CWE

## Exercice 1 : Analyser l'App 002

```powershell
python src\converters\semantic-to-sarif.py --scan-dir apm-demo-app-002 --output app002-semantic.sarif
```

![Résultats de l'analyse sémantique](../../../images/lab-04/lab-04-semantic-results.png)

## Point de vérification

- [ ] Le scanner sémantique produit des résultats pour les apps 002 et 004

## Étapes suivantes

Passez au [Labo 05 : Validation de configuration MCP](../lab-05-mcp-validation).
