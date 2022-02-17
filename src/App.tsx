import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MoviesBase from "./Components/MoviesBase/MoviesBase";
import Header from "./Components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieFavorites from "./Components/MovieFavorites/MovieFavorites";
import MovieDescription from "./Components/MovieDescription/MovieDescription";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesBase />} />
        <Route path="/favorites" element={<MovieFavorites />} />
        <Route path="/movies/:id" element={<MovieDescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
