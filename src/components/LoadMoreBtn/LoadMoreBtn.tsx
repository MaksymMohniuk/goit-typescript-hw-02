import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <div className={styles["load-more-btn-container"]}>
      <button className={styles["load-more-btn"]} onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
