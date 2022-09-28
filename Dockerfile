# Use node as the base image
FROM node:16.13.1-alpine3.14 as builder

# Define how verbose should npm install be
ARG NPM_LOG_LEVEL=silent
# Hide Open Collective message from install logs
ENV OPENCOLLECTIVE_HIDE=1
# Hiden NPM security message from install logs
ENV NPM_CONFIG_AUDIT=false
# Hide NPM funding message from install logs
ENV NPM_CONFIG_FUND=false

# Update npm to version 7
RUN npm i -g npm@8.1.2

# Set the working directory
WORKDIR /app

# Copy files specifying dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --loglevel=$NPM_LOG_LEVEL;

# Copy Prisma schema
COPY prisma/schema.prisma ./prisma/

# Generate Prisma client
RUN npm run prisma:generate;

# Copy all the files
COPY . .

# Build code
RUN set -e; (npm run build)

# Expose the port the server listens to
EXPOSE 3005

# Make server to serve admin built files
ENV SERVE_STATIC_ROOT_PATH=client-ui/dist

# Run server
# CMD [ "node", "server/dist/main"]
WORKDIR /app/server
CMD ["npm" , "run" ,"start:debug"]
