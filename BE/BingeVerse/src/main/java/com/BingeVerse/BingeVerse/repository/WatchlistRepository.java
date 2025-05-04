package com.BingeVerse.BingeVerse.repository;

import com.BingeVerse.BingeVerse.model.WatchlistItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface WatchlistRepository extends MongoRepository<WatchlistItem, String> {
    List<WatchlistItem> findByUserEmail(String userEmail);
    Optional<WatchlistItem> findByUserEmailAndMovieId(String userEmail, String movieId);
}
