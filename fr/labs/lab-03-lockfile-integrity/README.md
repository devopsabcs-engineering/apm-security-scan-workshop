---
layout: default
title: "Labo 03 : Intégrité lockfile"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-03-lockfile-integrity
---

> 🇬🇧 **[English version]({{ '/labs/lab-03-lockfile-integrity/' | relative_url }})**

# Labo 03 : Intégrité des fichiers de verrouillage et vérifications de politique

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 30 min | Intermédiaire | Labo 02 |

## Objectifs d'apprentissage

- Exécuter la vérification de lockfile `apm audit --ci`
- Comprendre les 6 vérifications de base et les 16 vérifications de politique

## Exercice 1 : Vérifier l'App 005

```powershell
cd apm-demo-app-005
apm audit --ci
```

## Point de vérification

- [ ] `apm audit --ci` détecte le lockfile manquant dans l'app 005

## Étapes suivantes

Passez au [Labo 04 : Analyse de motifs sémantiques](../lab-04-semantic-patterns).
