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

# Compile TypeScript to JavaScript (outputs to the `dist` directory)
RUN npm run build
RUN npm run test

# Copy the `dist` directory to the `/app` directory
# RUN cp -r dist ./

# Expose the port the app runs on (replace 3000 with your app's port if different)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
