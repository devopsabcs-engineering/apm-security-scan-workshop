---
layout: default
title: "Labo 02 : Analyse Unicode"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-02-unicode-scanning/
---

> 🇬🇧 **[English version]({{ '/labs/lab-02-unicode-scanning/' | relative_url }})**

# Labo 02 : Analyse de sécurité du contenu Unicode

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 35 min | Intermédiaire | Labo 01 |

## Objectifs d'apprentissage

- Exécuter `apm audit` pour détecter les caractères Unicode cachés
- Comprendre le modèle de sévérité à 3 niveaux
- Interpréter la sortie SARIF du scanner Unicode

## Exercice 1 : Exécuter APM Audit sur l'App 001

```powershell
cd apm-demo-app-001
apm audit
```

## Exercice 2 : Générer la sortie SARIF

```powershell
apm audit -f sarif -o apm-unicode-results.sarif
```

## Point de vérification

- [ ] `apm audit` s'exécute avec succès sur l'app 001
- [ ] Le fichier SARIF est généré avec des résultats

## Étapes suivantes

Passez au [Labo 03 : Intégrité des fichiers de verrouillage](../lab-03-lockfile-integrity).
