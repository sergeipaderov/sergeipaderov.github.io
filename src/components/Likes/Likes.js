import styles from "./Likes.module.css";
import {ReactComponent as HeartFilledIcon} from "./filledHeart.svg";
import {ReactComponent as HeartEmptyIcon} from "./heart.svg";
import {ReactComponent as HeartGreyIcon} from "./heartGrey.svg";

const Likes = ({quantity = 0, type = "grey", onAddLike, commentId}) => {
    return (
        <div className={styles.likesBLock}>
            {type === "filled" ? (
                <HeartFilledIcon
                    className={styles.likesBLockIcon}
                    onClick={() => onAddLike(commentId)}
                />
            ) : null}
            {type === "grey" ? (
                <HeartGreyIcon
                    className={styles.likesBLockIcon}
                    onClick={() => onAddLike(commentId)}
                />
            ) : null}
            {type === "empty" ? (
                <HeartEmptyIcon
                    className={styles.likesBLockIcon}
                    onClick={() => onAddLike(commentId)}
                />
            ) : null}
            {quantity}
        </div>
    );
};

export default Likes;
