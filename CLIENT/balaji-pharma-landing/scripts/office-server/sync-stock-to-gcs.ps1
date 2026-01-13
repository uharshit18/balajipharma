<# 
    Balaji Pharma - Stock Sync to Google Cloud Storage
    ==================================================
    This script uploads stock data from CRM to Google Cloud Storage
    
    Prerequisites:
    1. Google Cloud SDK installed (https://cloud.google.com/sdk/docs/install)
    2. Service account JSON key saved to E:\us16\gcs-credentials.json
    3. gcloud authenticated: gcloud auth activate-service-account --key-file=E:\us16\gcs-credentials.json
    
    Schedule: Run every hour via Windows Task Scheduler
#>

# ============ CONFIGURATION ============
$SourceFile = "E:\us16\stocksjson.txt"
$BucketName = "balaji-pharma-stock-data"
$DestinationFileName = "ADMINStocks.json"
$CredentialsFile = "E:\us16\gcs-credentials.json"
$LogFile = "E:\us16\sync-log.txt"

# ============ FUNCTIONS ============

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry
    Add-Content -Path $LogFile -Value $LogEntry -ErrorAction SilentlyContinue
}

function Test-JsonValid {
    param([string]$FilePath)
    try {
        $content = Get-Content -Path $FilePath -Raw -ErrorAction Stop
        $null = $content | ConvertFrom-Json -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# ============ MAIN SCRIPT ============

Write-Log "========== Stock Sync Started =========="

# Step 1: Check if source file exists
if (-not (Test-Path $SourceFile)) {
    Write-Log "ERROR: Source file not found: $SourceFile" "ERROR"
    exit 1
}

Write-Log "Source file found: $SourceFile"

# Step 2: Validate JSON format
Write-Log "Validating JSON format..."
if (-not (Test-JsonValid -FilePath $SourceFile)) {
    Write-Log "ERROR: Source file is not valid JSON!" "ERROR"
    exit 1
}
Write-Log "JSON validation passed"

# Step 3: Check if credentials file exists
if (-not (Test-Path $CredentialsFile)) {
    Write-Log "WARNING: Credentials file not found at $CredentialsFile" "WARN"
    Write-Log "Attempting to use existing gcloud authentication..."
}

# Step 4: Activate service account (if credentials file exists)
if (Test-Path $CredentialsFile) {
    Write-Log "Activating service account..."
    $activateResult = & gcloud auth activate-service-account --key-file="$CredentialsFile" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "ERROR: Failed to activate service account: $activateResult" "ERROR"
        exit 1
    }
}

# Step 5: Upload to GCS
Write-Log "Uploading to Google Cloud Storage..."
Write-Log "Destination: gs://$BucketName/$DestinationFileName"

$uploadResult = & gsutil -h "Cache-Control:public, max-age=300" cp $SourceFile "gs://$BucketName/$DestinationFileName" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Log "SUCCESS: File uploaded successfully!" "SUCCESS"
    
    # Step 6: Verify upload by getting file info
    $fileInfo = & gsutil stat "gs://$BucketName/$DestinationFileName" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Log "Verified: File exists in bucket"
    }
    
    # Step 7: Make file public (in case bucket doesn't have public access)
    Write-Log "Ensuring public access..."
    & gsutil acl ch -u AllUsers:R "gs://$BucketName/$DestinationFileName" 2>&1
    
    Write-Log "Public URL: https://storage.googleapis.com/$BucketName/$DestinationFileName"
    Write-Log "========== Stock Sync Completed Successfully =========="
    exit 0
}
else {
    Write-Log "ERROR: Upload failed: $uploadResult" "ERROR"
    Write-Log "========== Stock Sync Failed =========="
    exit 1
}
