# Start Script for EcoSphere

Write-Host "Starting Backend..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "server/seed.js" -Wait
Start-Process "cmd.exe" "/c cd server && npm run dev"

Write-Host "Starting Frontend..."
Start-Process "cmd.exe" "/c cd client && npm run dev"

Write-Host "EcoSphere is starting up!"
