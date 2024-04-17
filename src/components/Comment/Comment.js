import styles from "./Comment.module.css";
import Likes from "../Likes/Likes";
import Moment from "react-moment";

const Comment = ({comment, onAddLike}) => {
    return (
        <>
            <BaseComment comment={comment} onAddLike={onAddLike} />
            {comment.children.length
                ? comment.children.map((item, i) => (
                      <BaseComment
                          onAddLike={onAddLike}
                          comment={item}
                          sub={true}
                          key={i}
                      />
                  ))
                : null}
        </>
    );
};

const BaseComment = ({comment, sub = false, onAddLike}) => {
    const date = new Date(comment?.created);

    return (
        <>
            <div className={sub ? styles.subComment : styles.comment}>
                <div className={styles.infoBlock}>
                    <div className={styles.author}>
                        <img
                            alt="avatar"
                            className={styles.authorAvatar}
                            src={comment?.author?.avatar}
                        />
                        <div className={styles.authorNameWrapper}>
                            <p className={styles.authorName}>
                                {comment?.author?.name}
                            </p>
                            <Moment
                                className={styles.lastVisit}
                                date={date}
                                format="DD.MM.YYYY hh:mm:ss"
                            />
                        </div>
                    </div>

                    <div className={styles.likes}>
                        <Likes
                            commentId={comment?.id}
                            type={comment?.isLiked ? "filled" : "empty"}
                            quantity={comment?.likes}
                            onAddLike={onAddLike}
                        />
                    </div>
                </div>
                <div className={styles.textBlock}>{comment?.text}</div>
            </div>
        </>
    );
};

export default Comment;
