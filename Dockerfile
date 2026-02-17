FROM mcr.microsoft.com/windows/servercore:ltsc2022

# Usar PowerShell como shell
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Directorio de trabajo
WORKDIR C:/app

# Descargar Node.js 18 LTS
RUN Invoke-WebRequest -Uri https://nodejs.org/dist/v18.20.4/node-v18.20.4-x64.msi -OutFile C:/node.msi

# Instalar Node.js
RUN Start-Process msiexec.exe -ArgumentList '/i C:\node.msi /quiet /norestart' -Wait

# Limpiar instalador
RUN Remove-Item C:/node.msi -Force

# Verificar instalación
RUN node -v; npm -v

# Copiar manifests
COPY package.json yarn.lock ./

# Instalar yarn y dependencias
RUN npm install -g yarn
RUN yarn install --production --frozen-lockfile

# Copiar código
COPY . .

# Build TypeScript
RUN yarn build

# Exponer puerto
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Arranque
CMD ["node", "dist/server.js"]
