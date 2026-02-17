# Java Tests Runner for Windows
# This script helps run Java tests without needing Maven in PATH

# SETUP INSTRUCTIONS:
# 1. Extract apache-maven-3.9.12-bin.zip to C:\maven
# 2. Update $MAVEN_HOME below if you extract it elsewhere
# 3. Run this script: .\run-java-tests.ps1

$MAVEN_HOME = "C:\maven\apache-maven-3.9.12"
$MVN = "$MAVEN_HOME\bin\mvn.cmd"

# Check if Maven exists
if (-not (Test-Path $MVN)) {
    Write-Host "ERROR: Maven not found at $MVN" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please extract apache-maven-3.9.12-bin.zip to C:\maven" -ForegroundColor Yellow
    Write-Host "Or update the MAVEN_HOME variable in this script" -ForegroundColor Yellow
    exit 1
}

# Check if Java is available
try {
    $javaVersion = & java -version 2>&1
    Write-Host "Java detected: $($javaVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Java not found in PATH" -ForegroundColor Red
    Write-Host "Please install Java 17+ or restart your terminal" -ForegroundColor Yellow
    exit 1
}

# Navigate to java-tests
Set-Location java-tests

Write-Host "`n=== Running Maven Commands ===`n" -ForegroundColor Cyan

# Compile
Write-Host "1. Compiling project..." -ForegroundColor Yellow
& $MVN compile
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compilation failed!" -ForegroundColor Red
    exit 1
}

# Install Playwright browsers
Write-Host "`n2. Installing Playwright Chromium..." -ForegroundColor Yellow
& $MVN exec:java -e -Dexec.mainClass="com.microsoft.playwright.CLI" -Dexec.args="install --with-deps chromium"

# Run tests
Write-Host "`n3. Running tests..." -ForegroundColor Yellow
& $MVN test

Write-Host "`n=== Tests Complete ===`n" -ForegroundColor Green
