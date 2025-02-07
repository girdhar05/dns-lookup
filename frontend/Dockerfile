# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if needed, e.g., for a Vite project)
RUN npm run build

# Expose the port the app runs on (replace 5173 with your app's port if different)
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev"]