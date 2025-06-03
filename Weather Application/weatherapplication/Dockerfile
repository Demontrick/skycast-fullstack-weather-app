# ---- Stage 1: Builder with JDK 23 + Maven ----
FROM openjdk:23-jdk-slim AS builder

RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# ---- Stage 2: Runtime with JDK 23 ----
FROM openjdk:23-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/weatherapplication-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]