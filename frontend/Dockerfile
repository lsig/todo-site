# Use the official Node.js 16 image as the base image
FROM node:lts-buster-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --quiet

# Copy the rest of the project files to the working directory
COPY . .

# Build the production-ready code
# RUN npm run build build does not work yet

# Expose the container port (adjust if necessary)
EXPOSE 5173

# Run the production build
CMD ["npm", "run", "dev"]
