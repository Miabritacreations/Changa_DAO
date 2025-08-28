@echo off
setlocal enabledelayedexpansion

:: Changa DAO Project Management Script
:: Usage: changa-dao.bat [command] [options]

set PROJECT_NAME=Changa_DAO
set FRONTEND_DIR=src\Changa_DAO_frontend
set BACKEND_DIR=src\Changa_DAO_backend

if "%1"=="" goto :show_help

:main
if "%1"=="install" goto :install
if "%1"=="build" goto :build
if "%1"=="start" goto :start
if "%1"=="dev" goto :dev
if "%1"=="test" goto :test
if "%1"=="deploy" goto :deploy
if "%1"=="dfx-start" goto :dfx_start
if "%1"=="dfx-stop" goto :dfx_stop
if "%1"=="dfx-deploy" goto :dfx_deploy
if "%1"=="clean" goto :clean
if "%1"=="help" goto :show_help
goto :unknown_command

:install
echo Installing dependencies...
call npm install
if exist "%FRONTEND_DIR%" (
    echo Installing frontend dependencies...
    cd %FRONTEND_DIR%
    call npm install
    cd ..\..
)
echo ✅ Dependencies installed successfully!
goto :end

:build
echo Building %PROJECT_NAME%...
if exist "%FRONTEND_DIR%" (
    echo Building frontend...
    cd %FRONTEND_DIR%
    call npm run build
    cd ..\..
)
echo ✅ Build completed successfully!
goto :end

:start
echo Starting %PROJECT_NAME%...
if exist "%FRONTEND_DIR%" (
    cd %FRONTEND_DIR%
    call npm start
    cd ..\..
) else (
    echo ❌ Frontend directory not found!
)
goto :end

:dev
echo Starting development server...
if exist "%FRONTEND_DIR%" (
    cd %FRONTEND_DIR%
    call npm run dev
    cd ..\..
) else (
    echo ❌ Frontend directory not found!
)
goto :end

:test
echo Running tests...
call npm test
if exist "%FRONTEND_DIR%" (
    cd %FRONTEND_DIR%
    call npm test
    cd ..\..
)
echo ✅ Tests completed!
goto :end

:deploy
if "%2"=="" (
    echo Deploying to default platform (vercel)...
    call bash ai-deploy.sh vercel
) else (
    echo Deploying to %2...
    call bash ai-deploy.sh %2
)
goto :end

:dfx_start
echo Starting DFX local network...
dfx start --background
echo ✅ DFX local network started!
echo 🌐 Local network URL: http://localhost:4943
goto :end

:dfx_stop
echo Stopping DFX local network...
dfx stop
echo ✅ DFX local network stopped!
goto :end

:dfx_deploy
echo Deploying to DFX local network...
dfx deploy
echo ✅ Deployed to local network!
goto :end

:clean
echo Cleaning project...
if exist "node_modules" rmdir /s /q node_modules
if exist "%FRONTEND_DIR%\node_modules" rmdir /s /q "%FRONTEND_DIR%\node_modules"
if exist ".dfx" rmdir /s /q .dfx
if exist "%FRONTEND_DIR%\dist" rmdir /s /q "%FRONTEND_DIR%\dist"
echo ✅ Clean completed!
goto :end

:show_help
echo.
echo 🚀 %PROJECT_NAME% Project Management Script
echo ===========================================
echo.
echo Usage: changa-dao.bat [command] [options]
echo.
echo Commands:
echo   install     - Install all dependencies
echo   build       - Build the project
echo   start       - Start the production server
echo   dev         - Start development server
echo   test        - Run tests
echo   deploy      - Deploy the project (default: vercel)
echo   dfx-start   - Start DFX local network
echo   dfx-stop    - Stop DFX local network
echo   dfx-deploy  - Deploy to DFX local network
echo   clean       - Clean all build artifacts and dependencies
echo   help        - Show this help message
echo.
echo Deployment Platforms:
echo   vercel      - Deploy to Vercel
echo   github-pages - Deploy to GitHub Pages
echo   netlify     - Deploy to Netlify
echo   icp         - Deploy to Internet Computer
echo.
echo Examples:
echo   changa-dao.bat install
echo   changa-dao.bat build
echo   changa-dao.bat deploy vercel
echo   changa-dao.bat dfx-start
echo.
goto :end

:unknown_command
echo ❌ Unknown command: %1
echo.
echo Use 'changa-dao.bat help' to see available commands.
goto :end

:end
endlocal
