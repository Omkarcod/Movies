import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const Upcoming = () => {
  const Api_key = 'c45a857c193f6302f2b5061c3b85e743';
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=${currentPage}`;

  const getResults = async (url) => {
    try {
      const response = await axios.get(url);
      const upcomingMoviesData = response.data.results;
      setUpcomingMovies(upcomingMoviesData);

    
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getResults(upcomingURL);
  }, [upcomingURL, currentPage]);

  return (
    <Box style={{ margin: '50px 50px 00px 50px' }}>
      <Grid container spacing={8}>
        {upcomingMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Link style={{ textDecoration: 'none' }} to={`/movie/${movie.id}`}>
              <Card style={{ maxWidth: 250, boxShadow: '0px 0px 0px 0px ' }}>
                <CardMedia
                  component="img"
                  height="360"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent style={{ backgroundColor: '#282c34' }}>
                  <Typography variant="h5" component="div" align='center' color="white">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" align='center' color="white">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages} 
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          style={{marginBottom:"10px"}} 
        />
      </Box>
    </Box>
  );
};

export default Upcoming;
