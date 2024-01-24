import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "./Components/Home/Home";
import Toprated from "./Components/toprated/Toprated";
import Upcoming from "./Components/upcoming/Upcoming";
import Header from "./Components/header/Header";
import MovieDetails from "./Components/mobiedetails/MovieDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />;
          <Route path="/toprated" element={<Toprated />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
