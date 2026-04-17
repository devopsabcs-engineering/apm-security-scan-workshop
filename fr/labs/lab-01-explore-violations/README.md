---
layout: default
title: "Labo 01 : Explorer les violations"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-01-explore-violations
---

> 🇬🇧 **[English version]({{ '/labs/lab-01-explore-violations/' | relative_url }})**

# Labo 01 : Explorer les applications de démonstration et les violations

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 25 min | Débutant | Labo 00 |

## Objectifs d'apprentissage

- Comprendre l'architecture d'analyse à 4 moteurs
- Identifier les violations intentionnelles dans chaque application

## Exercice 1 : Matrice des applications

| App | Pile technique | Moteur principal | Violations |
|-----|---------------|-----------------|------------|
| 001 | Next.js + Copilot | Moteur 1 : Unicode | 18 |
| 002 | Flask + Claude | Moteur 3 : Sémantique | 17 |
| 003 | ASP.NET + MCP | Moteur 4 : MCP | 16 |
| 004 | Spring Boot + Skills | Moteur 3 : Sémantique | 17 |
| 005 | Go + multi-agent | Moteur 2 : Lockfile | 16 |

## Point de vérification

- [ ] Vous pouvez identifier au moins 3 types de violations par application

## Étapes suivantes

Passez au [Labo 02 : Analyse de sécurité Unicode](../lab-02-unicode-scanning).
