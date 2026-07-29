@echo off
title Institutional PMS Launcher

echo ========================================================
echo    Launching Institutional PMS Background Services
echo ========================================================
echo.

:: 1. Launch Python FastAPI Backend on Port 8090
echo Starting Python FastAPI Backend on http://127.0.0.1:8090...
start "FastAPI Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8090"

:: 2. Launch Vite React Frontend on Port 3000
echo Starting Vite React Frontend on http://127.0.0.1:3000...
start "Vite React Frontend" cmd /k "cd /d %~dp0frontend && npm.cmd run dev -- --host 127.0.0.1 --port 3000"

:: 3. Automatically open default browser dashboard
echo Opening web dashboard in default browser...
start http://127.0.0.1:3000/

echo.
echo ========================================================
echo    Services Started Successfully!
echo    - Web Dashboard: http://127.0.0.1:3000/
echo    - Backend API Docs: http://127.0.0.1:8090/docs
echo ========================================================
echo.
