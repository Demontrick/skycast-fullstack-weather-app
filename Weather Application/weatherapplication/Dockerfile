# Use an official Java runtime as a parent image
FROM openjdk:23-jdk-slim


# Set the working directory
WORKDIR /app

# Copy the Maven-built JAR from local to the container
COPY target/weatherapplication-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
