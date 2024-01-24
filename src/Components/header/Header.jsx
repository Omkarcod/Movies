import * as React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, List } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "0px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const Searchdiv = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`;

  const getResults = async (url) => {
    try {
      const response = await axios.get(url);
      const moviesData = response.data.results;
      setMovies(moviesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getResults(URL);
  }, []);

  useEffect(() => {
    const searchApi = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchQuery}&page=1`
        );
        setMovies(response.data.results);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Error searching:", error);
      }
    };

    if (searchQuery !== "") {
      searchApi();
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleResultClick = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{background:'#3c3636e6'}}>
          <Typography style={{ fontSize: "20px", fontWeight: "800",marginLeft:"30px" }}>
            MoviesDB
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              style={{
                margin: "0px 30px",
                color: "darkgray",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Popular
            </Typography>
          </Link>
          <Link to="/toprated" style={{ textDecoration: "none" }}>
            <Typography
              style={{
                margin: "0px 30px",
                color: "darkgray",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Top Rated
            </Typography>
          </Link>
          <Link to="/upcoming" style={{ textDecoration: "none" }}>
            <Typography
              style={{
                margin: "0px 30px",
                color: "darkgray",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Upcoming
            </Typography>
          </Link>

          <Searchdiv>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Movie"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
            {showSearchResults && searchQuery && (
              <List
                style={{
                  
                  position: "absolute",
                  background: "#FFF",
                  marginTop: "35px",
                }}
              >
                {movies.map((movie) => (
                  <List key={movie.id}>
                    <Link
                      onClick={handleResultClick}
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/movie/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                  </List>
                ))}
              </List>
            )}
          </Searchdiv>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
