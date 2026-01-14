# Imagen base liviana
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos solo manifests primero (mejor cache)
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install --production

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN yarn build

# Puerto interno (Express)
EXPOSE 3000

# Variable de entorno por defecto
ENV PORT=3000

# Arranque
CMD ["node", "dist/server.js"]