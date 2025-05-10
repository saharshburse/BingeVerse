package com.BingeVerse.BingeVerse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "watchlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WatchlistItem {

    @Id
    private String id; // MongoDB-generated ID for the item

    private String userEmail; // User's email for whom the watchlist item is saved

    private String movieId; // TMDB movie or series ID (unique identifier for the content)

    private String title; // Title of the movie, TV series, or anime

    private String posterPath; // Path to the poster image

    private String type; // Type of content: movie, tv, anime (for future use, could extend)

    private String description; // Optional description for the watchlist item (could be movie synopsis or TV series overview)

    private String addedDate; // Date when the item was added to the watchlist (useful for sorting)
}
