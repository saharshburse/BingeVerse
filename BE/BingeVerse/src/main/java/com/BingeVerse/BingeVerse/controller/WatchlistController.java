package com.BingeVerse.BingeVerse.controller;

import com.BingeVerse.BingeVerse.model.WatchlistItem;
import com.BingeVerse.BingeVerse.security.JwtService;
import com.BingeVerse.BingeVerse.service.WatchlistService;
import com.BingeVerse.BingeVerse.util.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;
    private final JwtService jwtService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addToWatchlist(HttpServletRequest request,@RequestBody WatchlistItem item) {
        try {
            String token = extractTokenFromHeader(request);
            String email = jwtService.extractEmail(token);
            item.setUserEmail(email);
            WatchlistItem savedItem = watchlistService.addToWatchlist(item);

            return ResponseEntity.ok(ApiResponse.success("Item added to watchlist", savedItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to add item to watchlist"));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getUserWatchlist(HttpServletRequest request) {
        try {
            String token = extractTokenFromHeader(request);
            String email = jwtService.extractEmail(token);
            List<WatchlistItem> items = watchlistService.getUserWatchlist(email);
            return ResponseEntity.ok(ApiResponse.success("Watchlist fetched", items));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to fetch watchlist: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> removeFromWatchlist(@PathVariable String id) {
        try {
            watchlistService.removeFromWatchlist(id);
            return ResponseEntity.ok(ApiResponse.success("Item removed from watchlist", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to remove item from watchlist"));
        }
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Missing or invalid Authorization header");
    }
}
