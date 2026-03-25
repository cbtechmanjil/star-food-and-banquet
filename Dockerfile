# Frontend with Vite preview
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 7000

# Run Vite preview (production mode)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "7000"]
