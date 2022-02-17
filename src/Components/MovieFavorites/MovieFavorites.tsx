import { FC } from 'react';
import { useSelector } from 'react-redux';
import MoviesItem from '../MoviesItem/MoviesItem';
import styles from './MovieFavorites.module.scss';

interface MovieFavoritesProps {}

const MovieFavorites: FC<MovieFavoritesProps> = () => {
  const favorites = useSelector((state: any) => state?.movies.favorites);

  return (
  <div className={styles.MovieFavorites}>
      {favorites.length ? favorites.map((film: any) => {
        return (
          <MoviesItem {...film}/>
        )
      }) : <h1>No any items in a favorites</h1> }
  </div>
  )
};

export default MovieFavorites;
