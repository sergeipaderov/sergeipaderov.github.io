import {useState, useEffect} from "react";
import getCommentsRequest from "../../api/comments/getCommentsRequest";
import getAuthorsRequest from "../../api/authors/getAuthorsRequest";
import styles from "./CommentsBlock.module.css";
import CommentsBlockHeader from "../CommentsBlockHeader/CommentsBlockHeader";
import Comment from "../Comment/Comment";

const CommentsBlock = () => {
    const [comments, setComments] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (page === totalPages) {
            setIsDisable(true);
        }
    }, [page]);

    useEffect(() => {
        onGetAuthors();
    }, []);

    useEffect(() => {
        if (authors.length) {
            onGetComments();
        }
    }, [authors]);

    const onGetComments = async (pageNum = 1) => {
        setIsLoading(true);
        try {
            let res = await getCommentsRequest(pageNum);
            res.pagination && setTotalPages(res?.pagination?.total_pages);

            if (res.data.length) {
                let newArr = [];

                res.data.map((el) => {
                    let author = authors.find((item) => item.id === el.author);
                    return newArr.push({
                        ...el,
                        author: author,
                        children: [],
                        isLiked: false,
                    });
                });

                let count = 0;
                newArr.map((item) => (count = count + item.likes));

                setTotalLikes(totalLikes + count);

                setTotalComments(totalComments + newArr.length);

                newArr.map((item) => {
                    if (item.parent != null) {
                        let parent = newArr.find((el) => el.id === item.parent);
                        parent.children.push(item);
                    }
                });

                let filteredArr = newArr.filter((el) => el.parent == null);

                setComments([...comments, ...filteredArr]);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log(`onGetComments Error with pageNum ${pageNum}:`, err);
            alert("Sorry! Something wrong here. Try again.");
        }
    };

    const onGetAuthors = async () => {
        try {
            let res = await getAuthorsRequest();
            return setAuthors(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onAddLike = (id) => {
        let arr = comments;

        arr.map((item) => {
            if (item.id === id) {
                if (item.isLiked) {
                    setTotalLikes(totalLikes - 1);
                    item.likes = item.likes - 1;
                } else {
                    setTotalLikes(totalLikes + 1);
                    item.likes = item.likes + 1;
                }
                item.isLiked = !item.isLiked;
            }

            if (item.children.length) {
                item.children.map((el) => {
                    if (el.id === id) {
                        if (el.isLiked) {
                            setTotalLikes(totalLikes - 1);
                            el.likes = el.likes - 1;
                        } else {
                            setTotalLikes(totalLikes + 1);
                            el.likes = el.likes + 1;
                        }
                        el.isLiked = !el.isLiked;
                    }
                });
            }
        });
    };

    return (
        <div className={styles.commentsBlock}>
            <CommentsBlockHeader
                totalComments={totalComments}
                totalLikes={totalLikes}
            />
            {comments.length
                ? comments.map((item, id) => (
                      <Comment key={id} comment={item} onAddLike={onAddLike} />
                  ))
                : null}
            <div className={styles.buttonWrapper}>
                {!isDisable && !isLoading ? (
                    <button
                        className={styles.button}
                        onClick={() => {
                            onGetComments(page + 1);
                            setPage(page + 1);
                        }}
                    >
                        Загрузить еще
                    </button>
                ) : null}
                {isLoading ? <p>Loading...</p> : null}
            </div>
        </div>
    );
};

export default CommentsBlock;
