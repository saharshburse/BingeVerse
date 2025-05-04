package com.BingeVerse.BingeVerse.service;

import com.BingeVerse.BingeVerse.model.WatchlistItem;
import com.BingeVerse.BingeVerse.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;

    public WatchlistItem addToWatchlist(WatchlistItem item) {
        // Optional: Avoid duplicates
        Optional<WatchlistItem> existing = watchlistRepository.findByUserEmailAndMovieId(item.getUserEmail(), item.getMovieId());
        if (existing.isPresent()) {
            throw new RuntimeException("Item already exists in watchlist");
        }
        return watchlistRepository.save(item);
    }

    public List<WatchlistItem> getUserWatchlist(String email) {
        return watchlistRepository.findByUserEmail(email);
    }

    public void removeFromWatchlist(String id) {
        if (!watchlistRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        watchlistRepository.deleteById(id);
    }


}
