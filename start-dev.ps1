
# Automatyczne czyszczenie cache Angular/Vite i uruchomienie dev servera

$cachePath = ".angular\cache"

function Clear-Cache {
    if (Test-Path $cachePath) {
        Write-Host "Czyszczenie cache Angular/Vite..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force $cachePath
        Write-Host "Cache usunięty ✅" -ForegroundColor Green
    } else {
        Write-Host "Cache nie istnieje, pomijam." -ForegroundColor Cyan
    }
}

function Start-DevServer {
    Write-Host "Uruchamianie Angular dev server..." -ForegroundColor Yellow
    Start-Process "ng" -ArgumentList "serve" -NoNewWindow -Wait
}

while ($true) {
    Clear-Cache
    Start-DevServer
    Write-Host "Dev server zakończony. Ponowne uruchomienie za 2 sekundy..." -ForegroundColor Magenta
    Start-Sleep -Seconds 2
}
