# --- Stage 1: Build the app ---
FROM maven:3.9.6-eclipse-temurin-23 AS builder

WORKDIR /app

# Copy the source code into the container
COPY . .

# Package the app (skip tests to speed up)
RUN mvn clean package -DskipTests

# --- Stage 2: Run the app ---
FROM openjdk:23-jdk-slim

WORKDIR /app

# Copy only the built JAR from the builder stage
COPY --from=builder /app/target/weatherapplication-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app listens on
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]