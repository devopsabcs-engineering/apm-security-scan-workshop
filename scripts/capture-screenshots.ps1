<#
.SYNOPSIS
    Captures workshop screenshots using Playwright.
.DESCRIPTION
    Automates screenshot capture for all labs in the APM Security Scan Workshop.
    Requires Playwright (npm install -D playwright) and a running demo environment.
.PARAMETER OutputDir
    Directory to save captured screenshots. Defaults to ../images.
#>
param(
    [string]$OutputDir = (Join-Path $PSScriptRoot "..\images")
)

$ErrorActionPreference = "Stop"

Write-Host "=== APM Security Scan Workshop — Screenshot Capture ===" -ForegroundColor Cyan

# Verify Playwright is installed
if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
    Write-Error "npx not found. Install Node.js first."
    return
}

$manifest = Get-Content (Join-Path $PSScriptRoot "screenshot-manifest.json") | ConvertFrom-Json

foreach ($entry in $manifest) {
    $labDir = Join-Path $OutputDir $entry.lab
    if (-not (Test-Path $labDir)) {
        New-Item -ItemType Directory -Path $labDir -Force | Out-Null
    }

    foreach ($shot in $entry.screenshots) {
        $outPath = Join-Path $labDir $shot.filename
        Write-Host "  Capturing: $($shot.filename)" -ForegroundColor Yellow

        if ($shot.type -eq "terminal") {
            Write-Host "    [MANUAL] Terminal screenshot required: $($shot.description)" -ForegroundColor DarkYellow
        }
        elseif ($shot.type -eq "browser") {
            npx playwright screenshot $shot.url $outPath --full-page 2>$null
        }
    }
}

Write-Host "`n=== Screenshot capture complete ===" -ForegroundColor Green
