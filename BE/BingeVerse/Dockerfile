# Stage 1: Build
FROM openjdk:19-jdk AS build
WORKDIR /app

# Copy necessary files from the backend folder
COPY BE/BingeVerse/pom.xml .
COPY BE/BingeVerse/mvnw .
COPY BE/BingeVerse/.mvn .mvn
COPY BE/BingeVerse/src src

# Set permission and build the JAR
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2: Run
FROM openjdk:19-jdk
VOLUME /tmp
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080
