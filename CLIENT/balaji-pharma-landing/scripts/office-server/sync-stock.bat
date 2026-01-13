@echo off
REM Balaji Pharma - Stock Sync Wrapper for Task Scheduler
REM ======================================================
REM This batch file is used by Windows Task Scheduler
REM It runs the PowerShell sync script and handles errors

cd /d E:\us16

echo Starting Stock Sync at %date% %time%

REM Run PowerShell script with bypass execution policy
powershell.exe -ExecutionPolicy Bypass -File "E:\us16\sync-stock-to-gcs.ps1"

REM Check exit code
if %ERRORLEVEL% EQU 0 (
    echo Stock sync completed successfully
) else (
    echo Stock sync failed with error code: %ERRORLEVEL%
)

exit /b %ERRORLEVEL%
