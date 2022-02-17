import { FC } from "react";
import styles from "./Loader.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {

  return (
    <div className={styles.Loader}>
      <ClipLoader loading={true} size={150} />
    </div>
  );
};

export default Loader;
