import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesList,
  fetchMoviesReceive,
} from "../../app/reducers/movies.reducer";
import MoviesItem from "../MoviesItem/MoviesItem";
import styles from "./MoviesBase.module.scss";

interface MoviesBaseProps {}

const MoviesBase: FC<MoviesBaseProps> = () => {
  const dispatch = useDispatch();
  const { results, totalPages } = useSelector(
    (state: any) => state?.movies.popular
  );
  const { searchResults, searchTotalPages, query } = useSelector(
    (state: any) => state?.movies.search
  );

  const [page, setPage]: [number, any] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (searchResults) {
      setMoviesList(searchResults);
      return;
    }
    if (searchResults?.length === 0) {
      setMoviesList([]);
      return;
    }

    setMoviesList(results);
  }, [results, searchResults]);

  useEffect(() => {
    dispatch(fetchMoviesList(page));
    dispatch(fetchMoviesReceive({ query, page }));
  }, [page]);

  useEffect(() => {
    if (searchTotalPages) {
      setHasMorePages(searchTotalPages > page);
      return;
    }
    setHasMorePages(totalPages > page);
  }, [totalPages, searchTotalPages]);

  const loadMoreFilms = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  return (
    <>
      <InfiniteScroll
        className={styles.MoviesBase}
        next={loadMoreFilms}
        hasMore={hasMorePages}
        loader={''}
        dataLength={moviesList.length}
      >
        {moviesList?.length ? (
          moviesList.map((film: any, index: number) => (
            <MoviesItem
              key={index}
              title={film.title}
              id={film.id}
              img={film.poster_path}
              voteAveraga={film.vote_average}
              overview={film.overview}
              date={film.release_date}
              
            />
          ))
        ) : (
          <h1 className={styles.notFoundMovie}>Sorry, we didn't find such a movies</h1>
        )}
      </InfiniteScroll>
    </>
  );
};

export default MoviesBase;
