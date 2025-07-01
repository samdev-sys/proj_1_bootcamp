@echo off
title Iniciar Backend y Generador de Contraseñas

REM Iniciar backend Node.js
start cmd /k "cd /d C:\Users\user\Desktop\proj_1_bootcamp && npm start"

REM Iniciar app de contraseñas en Python (Streamlit)
start cmd /k "cd /d C:\Users\user\Desktop\proj_1_bootcamp\public\Frontend\python_files && streamlit run app.py"

echo ✅ Aplicaciones iniciadas.
pause
