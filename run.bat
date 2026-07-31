@echo off
title Institutional PMS Launcher

echo ========================================================
echo    Launching Institutional PMS Background Services
echo ========================================================
echo.

:: 0. Free ports 3000 and 8090 if currently occupied by stale processes
echo Checking and clearing stale processes on ports 3000 & 8090...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8090 ^| findstr LISTENING') do taskkill /f /pid %%a >nul 2>&1

:: 1. Launch Python FastAPI Backend & Centralized Market Data Hub Daemon on Port 8090
echo Starting Python FastAPI Backend & Market Data Hub Daemon on http://127.0.0.1:8090...
start "FastAPI Backend & Market Data Hub" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8090"

:: 2. Launch Vite React Frontend on Port 3000
echo Starting Vite React Frontend on http://127.0.0.1:3000...
start "Vite React Frontend" cmd /k "cd /d %~dp0frontend && npx.cmd vite --host 127.0.0.1 --port 3000"


:: 3. Wait 3 seconds for servers to initialize before opening browser
echo Waiting for services to initialize...
timeout /t 3 /nobreak >nul

:: 4. Automatically open default browser dashboard
echo Opening web dashboard in default browser...
start http://127.0.0.1:3000/

echo.
echo ========================================================
echo    Services Started Successfully!
echo    - Web Dashboard:           http://127.0.0.1:3000/
echo    - Backend API & Hub Docs:  http://127.0.0.1:8090/docs
echo    - Shared SQLite Data Hub:  backend\institutional_pms.db (WAL Mode)
echo ========================================================
echo.


