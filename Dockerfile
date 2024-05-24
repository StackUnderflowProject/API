# Use the official Node.js 18 Alpine image as base
FROM node:20-alpine

# Set build arguments (optional)
ARG DB_URL
ARG JWT_SECRET

# Set environment variables using build arguments
ENV DB_URL=$DB_URL
ENV JWT_SECRET=$JWT_SECRET

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies using npm (assuming package.json is present)
RUN npm install

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["node", "bin/www"]