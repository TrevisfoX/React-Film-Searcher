import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMoviesDescription } from "../../app/reducers/movies.reducer";
import styles from "./MovieDescription.module.scss";

interface MovieDescriptionProps {}

const MovieDescription: FC<MovieDescriptionProps> = () => {
  const {id}: any = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state: any) => state.movies.currentMovie)

  useEffect(() => {
    dispatch(fetchMoviesDescription(id));
  }, [id])

  return (
    <div className={styles.MovieDescription}>
      <img src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`} alt="poster" />
      <h1>{details?.title}</h1>
      <h2>{details?.tagline}</h2>
      <p>{details?.overview}</p>
    </div>
  );
};

export default MovieDescription;
