# Stage 1: Build using Java 21
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy project files from BE/BingeVerse folder
COPY BE/BingeVerse/pom.xml ./
COPY BE/BingeVerse/mvnw ./
COPY BE/BingeVerse/.mvn .mvn
COPY BE/BingeVerse/src ./src

# Give execution permission to mvnw
RUN chmod +x mvnw

# Build the application without running tests
RUN ./mvnw clean package -DskipTests

# Stage 2: Run with minimal image
FROM eclipse-temurin:21-jdk
VOLUME /tmp

# Copy built jar from previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app.jar"]
