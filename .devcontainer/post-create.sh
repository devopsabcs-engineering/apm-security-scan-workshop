#!/usr/bin/env bash
set -euo pipefail

echo "=== APM Security Scan Workshop — post-create ==="

# Install APM CLI
npm install -g @microsoft/apm 2>/dev/null || echo "APM CLI install skipped (package may not be published yet)"

# Install Python dependencies for converters
pip install --quiet --upgrade pip

# Clone the scanner demo-app repo as a sibling directory
SCANNER_REPO="https://github.com/devopsabcs-engineering/apm-security-scan-demo-app.git"
SCANNER_DIR="../apm-security-scan-demo-app"
if [ ! -d "$SCANNER_DIR" ]; then
    echo "Cloning scanner demo-app repository..."
    git clone "$SCANNER_REPO" "$SCANNER_DIR" || echo "Clone skipped — fork or clone manually"
else
    echo "Scanner demo-app already exists at $SCANNER_DIR"
fi

echo "=== Environment ready ==="
