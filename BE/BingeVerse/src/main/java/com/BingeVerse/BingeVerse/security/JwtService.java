package com.BingeVerse.BingeVerse.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.security.Key;
import javax.crypto.spec.SecretKeySpec;

@Service
public class JwtService {

    private final String SECRET_KEY = "bingeverse_secret_key_for_jwt_token_12345"; // Change this to your secure key
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // Generate signing key using HMAC algorithm (AES-compatible)
    private Key getSigningKey() {
        return new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hrs
                .signWith(key)
                .compact();
    }

    // Extract email from JWT token
    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(getSigningKey()) // Set the signing key
                .parseClaimsJws(token) // Parse the JWT token
                .getBody(); // Extract claims
        return claims.getSubject(); // Get the subject (email)
    }

    // Validate JWT token
    public boolean isTokenValid(String token, String userEmail) {
        String extractedEmail = extractEmail(token);
        return extractedEmail.equals(userEmail) && !isTokenExpired(token);
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date()); // Check if token is expired
    }
}
