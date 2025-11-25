# 🚀 Quick Deploy Script
# Run this in PowerShell to prepare for deployment

Write-Host "╔══════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   India Path Finder - Deployment Preparation      ║" -ForegroundColor Cyan
Write-Host "║   Created by Panashe Kunaka                        ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "⚠️  Git not initialized. Initializing..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✅ Git initialized!" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Checking files..." -ForegroundColor Cyan

# Check required files
$requiredFiles = @(
    "requirements.txt",
    "Procfile",
    "runtime.txt",
    "README.md",
    "app.py",
    ".gitignore"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "❌ Some required files are missing!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Git Status:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "🔍 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Review the changes above" -ForegroundColor White
Write-Host "  2. Run: git add ." -ForegroundColor White
Write-Host "  3. Run: git commit -m '🚀 Production ready - Enhanced by Panashe Kunaka'" -ForegroundColor White
Write-Host "  4. Add remote: git remote add origin <your-github-repo-url>" -ForegroundColor White
Write-Host "  5. Push: git push -u origin main" -ForegroundColor White
Write-Host "  6. Deploy on Render: https://dashboard.render.com/" -ForegroundColor White

Write-Host ""
Write-Host "📚 Read DEPLOYMENT.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Your app is ready to deploy!" -ForegroundColor Green
Write-Host ""
