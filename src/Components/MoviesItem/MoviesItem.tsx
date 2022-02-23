import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ChangeFavorites } from "../../app/reducers/movies.reducer";
import styles from "./MoviesItem.module.scss";
import noImgPlaceholder from "../../Assets/image/no-iamge-placeholder.jpg";
interface MoviesItemProps {
  title: string;
  id: string;
  img: string;
  voteAveraga: number;
  overview: string;
  date: string;
}

const MoviesItem: FC<MoviesItemProps> = (props: any) => {
  const { title, img, id, overview, date, voteAveraga } = props;

  const dispatch = useDispatch();

  const handleMarkToFavorite = () => {
    dispatch(ChangeFavorites(props));
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`movies/${id}`} className={styles.link}>
        <div className={styles.MoviesItem}>
          <img
            className={styles.movieCard}
            width={"300px"}
            height={"450px"}
            src={
              img
                ? `https://image.tmdb.org/t/p/w500${img}`
                : `${noImgPlaceholder}`
            }
          />

          <div className={styles.info}>
            <p>{overview}</p>
          </div>

          <div className={styles.footerInfo}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.reating}>&#9733; {voteAveraga}</div>
            </div>
            <p className={styles.year}>{new Date(date).getFullYear()}</p>
          </div>
        </div>
      </Link>

      <div className={styles.btnFavorites} onClick={handleMarkToFavorite}>
        &#11088;
      </div>
    </div>
  );
};

export default MoviesItem;
