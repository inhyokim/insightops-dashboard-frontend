# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Use envsubst to replace PORT variable in nginx config
CMD envsubst < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && \
    mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf && \
    nginx -g "daemon off;"