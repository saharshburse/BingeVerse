import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, getwatchList } from "../../store/watchListSlice";
import { Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WatchlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(getwatchList);
  // const { email } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    
    // if (!token) {
    //   navigate("/login"); // redirect if no token
    //   return;
    // }
    dispatch(fetchWatchlist());
    console.log("fetch")
  }, [dispatch, navigate]);

  // if (loading) {
  //   return (
  //     <Box textAlign="center" mt={10}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Box textAlign="center" mt={10}>
  //       <Typography variant="h6" color="error">
  //         {error}
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your watchlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map((movie) => (
            <Grid>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {movie.type}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WatchlistPage;
