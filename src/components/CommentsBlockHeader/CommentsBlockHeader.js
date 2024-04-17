import styles from "./CommentsBlockHeader.module.css";
import Likes from "../Likes/Likes";

const CommentsBlockHeader = ({totalComments = 0, totalLikes = 0}) => {
    return (
        <div className={styles.commentsBlockHeader}>
            <div>{`${totalComments} комментариев`}</div>
            <Likes quantity={totalLikes} />
        </div>
    );
};

export default CommentsBlockHeader;
