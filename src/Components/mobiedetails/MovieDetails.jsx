import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,

  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";

const BackgroundImageBlock = styled(Box)({
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  minHeight: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const MovieDetails = () => {
  const { movieId } = useParams();
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const movieBackdrop = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
  const moviePoster = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Api_key}&language=en-US`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${Api_key}&language=en-US`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [movieId]);

  return (
    <>
    <Box style={{padding:"20px"}}>
      <BackgroundImageBlock
        style={{ backgroundImage: `url(${movieBackdrop})` }}
      >
        {moviePoster && (
          <>
            <Card
              style={{
                width: "200px",
                borderRadius: "8px",
                position: "absolute",
                top: "10px",
                left: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={moviePoster}
                alt={`${movieDetails.title} poster`}
                style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
              <CardContent>
                <Typography color="black" variant="h6" gutterBottom>
                  {movieDetails.title}
                </Typography>
                <Typography color="black" variant="body1" gutterBottom>
                  Rating: {movieDetails.vote_average}
                </Typography>
                <Typography color="black" variant="body1" gutterBottom>
                  Duration: {movieDetails.runtime} minutes
                </Typography>
                <Typography color="black" variant="body1" gutterBottom>
                  Release Date: {movieDetails.release_date}
                </Typography>
              </CardContent>
            </Card>
            <Box
              style={{
                position: "absolute",
                top: "85%",
                left: "30px",
                color: "#fff",
                fontSize: 18,
              }}
            >
              <Box component="span" style={{ fontSize: 20, fontWeight: 600 }}>
                Overview:
              </Box>
              {movieDetails.overview}
            </Box>
          </>
        )}
      </BackgroundImageBlock>
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Typography variant="h4" gutterBottom color='white'>
          Cast
        </Typography>
      </Box>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
  {cast.map((actor, index) => (
    <Grid item key={actor.id} xs={6} sm={4} md={3} lg={2} xl={2}>
      <Card
        style={{
          textAlign: "center",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow:"none",
        }}
      >
        {actor.profile_path ? (
          <img
            alt={actor.name}
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "150px",
              backgroundColor: "#2196f3",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{actor.name.charAt(0)}</span>
          </div>
        )}
        <CardContent style={{ padding: "20px" }}>
          <Typography variant="body2" style={{ marginTop: "8px" }}>
            {actor.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {actor.character}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>




    </>
  );
};

export default MovieDetails;
