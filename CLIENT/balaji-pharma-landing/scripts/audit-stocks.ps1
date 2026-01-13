
$localPath = "c:\Users\Owner\Desktop\anti0gravity balaji pharma\balajipharma\CLIENT\balaji-pharma-landing\public\assets\ADMINStocks.json"
$gcsUrl = "https://storage.googleapis.com/balaji-pharma-stock-data/ADMINStocks.json"
$tempGcsPath = "c:\Users\Owner\Desktop\anti0gravity balaji pharma\balajipharma\CLIENT\balaji-pharma-landing\GCS_ADMINStocks.json"

Write-Host "--- Stock Data Audit ---"

# Load local data
if (Test-Path $localPath) {
    $localData = Get-Content $localPath | ConvertFrom-Json
    Write-Host "Local file: $localPath"
    Write-Host "Local product count: $($localData.Count)"
} else {
    Write-Host "Error: Local file not found."
    exit 1
}

# Download GCS data
Write-Host "Downloading GCS data..."
Invoke-WebRequest -Uri $gcsUrl -OutFile $tempGcsPath

if (Test-Path $tempGcsPath) {
    $gcsData = Get-Content $tempGcsPath | ConvertFrom-Json
    Write-Host "GCS product count: $($gcsData.Count)"
} else {
    Write-Host "Error: GCS file download failed."
    exit 1
}

# Comparison
$localCodes = $localData.ProductCode | Sort-Object -Unique
$gcsCodes = $gcsData.ProductCode | Sort-Object -Unique

$missingFromGcs = $localCodes | Where-Object { $_ -notin $gcsCodes }
$newInGcs = $gcsCodes | Where-Object { $_ -notin $localCodes }

Write-Host "------------------------"
Write-Host "Missing from GCS: $($missingFromGcs.Count)"
if ($missingFromGcs.Count -gt 0) {
    Write-Host "First 10 missing products: "
    $missingFromGcs | Select-Object -First 10 | ForEach-Object { Write-Host " - $_" }
}

Write-Host "New in GCS: $($newInGcs.Count)"
if ($newInGcs.Count -gt 0) {
    Write-Host "First 10 new products: "
    $newInGcs | Select-Object -First 10 | ForEach-Object { Write-Host " - $_" }
}

# Format Check
$firstGcs = $gcsData[0]
Write-Host "------------------------"
Write-Host "GCS Record Format Check (First Record):"
$firstGcs | Out-String | Write-Host

Write-Host "------------------------"
Write-Host "Audit Complete."
