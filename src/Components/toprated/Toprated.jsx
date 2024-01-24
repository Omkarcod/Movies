// TopRated.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Toprated = () => {
  const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=1`;
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const getResults = async (url) => {
    try {
      const response = await axios.get(url);
      const topRatedMoviesData = response.data.results;
      setTopRatedMovies(topRatedMoviesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getResults(topRatedURL);
  }, [topRatedURL]);

  return (
    <Box style={{margin: '50px 50px 00px 50px'}}>
      <Grid container spacing={8}>
        {topRatedMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Link style={{textDecoration:"none"}} to={`/movie/${movie.id}`}>
            <Card style={{ maxWidth: 250 ,boxShadow:"none"}}>
              <CardMedia
                component="img"
                height="360"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent style={{backgroundColor:"#282c34"}}>
                <Typography variant="h5" align='center' color="white"  component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" align='center' color="white" >
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Toprated;
