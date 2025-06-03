# Use an official Java runtime as a parent image
FROM openjdk:23-jdk-slim

# Install Maven and dependencies
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean

# Set the working directory
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Build the project using Maven, skipping tests for faster build
RUN mvn clean package -DskipTests

# Copy the built JAR to a separate app.jar file
COPY target/weatherapplication-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]