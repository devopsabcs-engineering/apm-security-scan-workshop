---
layout: default
title: "Labo 00 : Prérequis"
nav_exclude: true
lang: fr
permalink: /fr/labs/lab-00-prerequisites/
---

> 🇬🇧 **[English version]({{ '/labs/lab-00-prerequisites/' | relative_url }})**

# Labo 00 : Prérequis et configuration de l'environnement

| Durée | Niveau | Prérequis |
|-------|--------|-----------|
| 30 min | Débutant | Aucun |

## Objectifs d'apprentissage

- Installer le CLI APM, Python 3.12+ et les extensions VS Code
- Cloner le dépôt scanner demo-app
- Vérifier que tous les outils fonctionnent correctement

## Exercice 1 : Installer les outils requis

```powershell
node --version
npm install -g @microsoft/apm
apm --version
python --version
az version
```

## Exercice 2 : Cloner le dépôt

```powershell
cd C:\src\GitHub\devopsabcs-engineering
git clone https://github.com/devopsabcs-engineering/apm-security-scan-demo-app.git
cd apm-security-scan-demo-app
```

## Point de vérification

- [ ] `apm --version` retourne un numéro de version
- [ ] `python --version` affiche 3.12 ou supérieur
- [ ] Le dépôt est cloné localement

## Étapes suivantes

Passez au [Labo 01 : Explorer les applications et violations](../lab-01-explore-violations).
