# Usando Node 20
FROM node:20

# Diretório de trabalho
WORKDIR /app

# Copiando package.json e package-lock.json
COPY package*.json ./

# Instalando dependências
RUN npm install

# Instalando ts-node e nodemon globalmente
RUN npm install -g ts-node nodemon typescript

# Copiando todo o projeto
COPY . .

# Expondo a porta da API
EXPOSE 3333

# Rodando com hot reload
CMD ["nodemon"]
