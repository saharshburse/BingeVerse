import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import {
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, fetchWatchlist, getwatchList, removeFromWatchlist } from "../../store/watchListSlice";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { email, token } = useSelector((state) => state.user);
  const items  = useSelector(getwatchList);
  const isLoggedIn = !!token;
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchWatchlist(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log("watchlist",items)
    if (items.length > 0 && currentMovieDetail) {
      const found = items.some((item) => item.movieId === String(currentMovieDetail.id));
      setIsInWatchlist(found);
    }
  }, [items, currentMovieDetail]);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data));
  };

  const handleAddToWatchlist = () => {
    if (!isLoggedIn) {
      setSnackbar({ open: true, message: "Please login to add to watchlist", severity: "warning" });
      return;
    }

    if (!currentMovieDetail) return;

    const movieData = {
      movieId: currentMovieDetail.id.toString(),
      title: currentMovieDetail.title,
      posterPath: currentMovieDetail.poster_path,
      type: "movie"
    };

    dispatch(addToWatchlist({ movie: movieData, token }))
      .unwrap()
      .then(() => {
        setSnackbar({ open: true, message: "Added to watchlist!", severity: "success" });
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Error adding to watchlist", severity: "error" });
      });
  };

  const handleRemoveFromWatchlist = () => {
    const item = watchlist.find((item) => item.movieId === String(currentMovieDetail.id));
    if (item) {
      dispatch(removeFromWatchlist({ id: item.id, token }))
        .unwrap()
        .then(() => {
          setSnackbar({ open: true, message: "Removed from watchlist!", severity: "success" });
          setConfirmOpen(false);
        })
        .catch(() => {
          setSnackbar({ open: true, message: "Failed to remove from watchlist", severity: "error" });
          setConfirmOpen(false);
        });
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img alt="" className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path || ""}`} />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img alt="" className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path || ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail?.original_title}</div>
            <div className="movie__tagline">{currentMovieDetail?.tagline}</div>
            <div className="movie__rating">
              {currentMovieDetail?.vote_average} <i className="fas fa-star" />
              <span className="movie__voteCount">({currentMovieDetail?.vote_count} votes)</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail?.runtime} mins</div>
            <div className="movie__releaseDate">Release date: {currentMovieDetail?.release_date}</div>
            <div className="movie__genres">
              {currentMovieDetail?.genres?.map((genre) => (
                <span className="movie__genre" key={genre.id}>{genre.name}</span>
              ))}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail?.overview}</div>
          </div>
        </div>
      </div>

      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail?.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt" /></span></p>
          </a>
        )}
        {currentMovieDetail?.imdb_id && (
          <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt" /></span></p>
          </a>
        )}
        
        {isInWatchlist ? (
          <Button variant="contained" color="success" onClick={() => setConfirmOpen(true)}>
            Added to Watchlist
          </Button>
        ) : (
          <Button variant="contained" onClick={handleAddToWatchlist}>
            Add to Watchlist
          </Button>
        )}
      </div>

      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail?.production_companies?.map((company) =>
          company.logo_path ? (
            <span className="productionCompanyImage" key={company.id}>
              <img alt="" className="movie__productionComapany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} />
              <span>{company.name}</span>
            </span>
          ) : null
        )}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirm Remove Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove from Watchlist?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleRemoveFromWatchlist}>Remove</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Movie;
