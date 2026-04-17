<#
.SYNOPSIS
    Helper functions for APM Security Scan Workshop screenshot capture.
#>

function Get-LabDirectories {
    param([string]$BasePath)
    Get-ChildItem -Path $BasePath -Directory | Where-Object { $_.Name -match '^lab-\d{2}' }
}

function New-ScreenshotFilename {
    param(
        [string]$LabId,
        [string]$StepName
    )
    $sanitized = $StepName -replace '[^a-zA-Z0-9-]', '-' -replace '-+', '-'
    return "$LabId-$sanitized.png"
}

function Test-ScreenshotManifest {
    param([string]$ManifestPath)
    if (-not (Test-Path $ManifestPath)) {
        Write-Error "Manifest not found: $ManifestPath"
        return $false
    }
    $manifest = Get-Content $ManifestPath | ConvertFrom-Json
    $valid = $true
    foreach ($entry in $manifest) {
        if (-not $entry.lab -or -not $entry.screenshots) {
            Write-Warning "Invalid entry in manifest: missing lab or screenshots"
            $valid = $false
        }
    }
    return $valid
}

Export-ModuleMember -Function Get-LabDirectories, New-ScreenshotFilename, Test-ScreenshotManifest
