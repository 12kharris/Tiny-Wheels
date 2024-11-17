import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import ProfilePreview from "../profiles/ProfilePreview";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";
import Comment from "../comments/Comment";

function Post(props) {
  const {
    Caption,
    Image,
    LikeDislike_id,
    LikeType,
    OwnerProfile,
    OwnerProfileID,
    OwnerProfileImage,
    OwnerUsername,
    Title,
    id,
    is_owner,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    Post: null,
    Content: "",
  });
  const [showComments, setShowComments] = useState(false);
  const [likesLoaded, setLikesLoaded] = useState(false);
  const [dislikesLoaded, setDislikesLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getComments();
      getLikes();
      getDislikes();
      setCommentFormData({
        Post: id,
        Content: "",
      });
    }
  }, [id, currentUser]);

  const getComments = async () => {
    if (id) {
      try {
        setCommentsLoaded(false);
        const { data } = await axiosRes.get(`/comments/?Post=${id}`);
        setComments(data);
        setCommentsLoaded(true);
      } catch (err) {}
    }
  };

  const getLikes = async () => {
    if (id) {
      try {
        setLikesLoaded(false);
        const { data } = await axiosRes.get(`/likes/?Post=${id}&IsLike=true`);
        setLikes(data);
        setLikesLoaded(true);
      } catch (err) {}
    }
  };

  const getDislikes = async () => {
    if (id) {
      try {
        setDislikesLoaded(false);
        const { data } = await axiosRes.get(`/likes/?Post=${id}&IsLike=false`);
        setDislikes(data);
        setDislikesLoaded(true);
      } catch (err) {}
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      history.push(`/profiles/${currentUser?.profile_id}`);
    } catch (err) {}
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        Post: id,
        IsLike: true,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? {
                ...post,
                Likes_count: post.Likes_count + 1,
                LikeDislike_id: data.id,
                LikeType: "like",
              }
            : post;
        })
      );

      getLikes();
    } catch (err) {}
  };

  const handleUnLike = async () => {
    try {
      await axiosRes.delete(`/likes/${LikeDislike_id}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? {
                ...post,
                Likes_count: post.Likes_count - 1,
                LikeDislike_id: null,
                LikeType: null,
              }
            : post;
        })
      );

      getLikes();
    } catch (err) {}
  };

  const handleDislike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", {
        Post: id,
        IsLike: false,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? {
                ...post,
                Dislikes_count: post.Dislikes_count + 1,
                LikeDislike_id: data.id,
                LikeType: "dislike",
              }
            : post;
        })
      );
      getDislikes();
    } catch (err) {}
  };

  const handleUnDislike = async () => {
    try {
      await axiosRes.delete(`/likes/${LikeDislike_id}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          return post.id === id
            ? {
                ...post,
                Dislikes_count: post.Dislikes_count - 1,
                LikeDislike_id: null,
                LikeType: null,
              }
            : post;
        })
      );

      getDislikes();
    } catch (err) {}
  };

  const handleCommentChange = (event) => {
    setCommentFormData({
      ...commentFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("Post", commentFormData.Post);
    formData.append("Content", commentFormData.Content);

    try {
      const { data } = await axiosReq.post("/comments/", formData);
      setAddComment(false);
      setComments((prevComments) => [...prevComments, data]);
      setCommentFormData({
        Post: id,
        Content: "",
      });
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Card key={id} className={styles.post}>
      <Card.Header>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <Link to={`/profiles/${OwnerProfileID}`}>
              <ProfilePreview
                imageURL={OwnerProfileImage}
                text={OwnerProfile?.Length > 0 ? OwnerProfile : OwnerUsername}
                height={50}
              />
            </Link>
          </Col>
          <Col xs={4} md={2}>
            {is_owner && (
              <OptionsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title className={styles.title}>{Title}</Card.Title>
        <Card.Text className={styles.caption}>{Caption}</Card.Text>
        <div className={styles.img_holder}>
          <Card.Img
            src={Image}
            className={styles.img}
            alt="post image"
          ></Card.Img>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className={styles.footer}>
          <Row>
            {/* Likes */}
            <>
              {LikeDislike_id && LikeType == "like" ? (
                <Col xs={8} md={6}>
                  <Row>
                    <Col>
                      {likesLoaded ? (
                        <span onClick={handleUnLike} className={styles.liked}>
                          {likes.length}{" "}
                          <i className="fa-solid fa-thumbs-up"></i>
                        </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                      {dislikesLoaded ? (
                        <span className={styles.thumbsdown}>
                          {dislikes.length}{" "}
                          <i className="fa-regular fa-thumbs-down"></i>
                        </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                  </Row>
                </Col>
              ) : LikeDislike_id && LikeType == "dislike" ? (
                <Col xs={8} md={6}>
                  <Row>
                    <Col>
                      {likesLoaded ? (
                        <span className={styles.thumbsup}>
                          {likes.length}
                          <i className="fa-regular fa-thumbs-up"></i>
                        </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                      {dislikesLoaded ? (
                        <span
                          onClick={handleUnDislike}
                          className={styles.disliked}
                        >
                          {dislikes.length}{" "}
                          <i className="fa-solid fa-thumbs-down"></i>
                        </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                  </Row>
                </Col>
              ) : is_owner ? (
                <Col xs={8} md={6}>
                  <Row>
                    <Col>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>You can't like your own post</Tooltip>
                        }
                      >
                        <span className={styles.thumbsup}>
                          {likes.length}
                          <i className="fa-regular fa-thumbs-up"></i>
                        </span>
                      </OverlayTrigger>
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>You can't dislike your own post</Tooltip>
                        }
                      >
                        <span className={styles.thumbsdown}>
                          {dislikes.length}
                          <i className="fa-regular fa-thumbs-down"></i>
                        </span>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Col>
              ) : currentUser ? (
                <Col xs={8} md={6}>
                  <Row>
                    <Col>
                      {likesLoaded ? (
                        <span onClick={handleLike} className={styles.thumbsup}>
                        {likes.length}
                        <i className="fa-regular fa-thumbs-up"></i>
                      </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                      {dislikesLoaded ? (
                        <span
                        onClick={handleDislike}
                        className={styles.thumbsdown}
                      >
                        {dislikes.length}
                        <i className="fa-regular fa-thumbs-down"></i>
                      </span>
                      ) : (
                        <Spinner animation="border" variant="dark" />
                      )}
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col xs={8} md={6}>
                  <Row>
                    <Col>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Log in to like a post</Tooltip>}
                      >
                        <span className={styles.thumbsup}>
                          {likes.length}{" "}
                          <i className="fa-regular fa-thumbs-up"></i>
                        </span>
                      </OverlayTrigger>
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Log in to dislike a post</Tooltip>}
                      >
                        <span className={styles.thumbsdown}>
                          {dislikes.length}{" "}
                          <i className="fa-regular fa-thumbs-down"></i>
                        </span>
                      </OverlayTrigger>
                    </Col>
                  </Row>
                </Col>
              )}
            </>
            {/* Comment Icon */}
            <Col>
              <i
                className="fa-regular fa-comment"
                onClick={() => {
                  setShowComments(!showComments);
                }}
              ></i>{" "}
              {comments.length}
            </Col>
          </Row>
        </div>
      </Card.Footer>
      {/* Comment form */}
      {showComments && (
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            value={id}
            name="Post"
            hidden
            readOnly
          ></Form.Control>
          <Form.Group>
            <Row>
              <Col xs={9} style={{ paddingRight: "0px" }}>
                <Form.Control
                  type="text"
                  value={commentFormData.Content}
                  name="Content"
                  placeholder="Type a comment..."
                  onChange={handleCommentChange}
                ></Form.Control>
                {errors.Content?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
              </Col>
              <Col style={{ paddingLeft: "0px" }}>
                <Button variant="success" type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      )}
      {/* Comments */}
      {showComments && (
        <Container>
          {commentsLoaded ? (
            comments.length > 0 ? (
              comments.map((c) => (
                <Comment key={c.id} {...c} getComments={getComments} />
              ))
            ) : (
              <p>No Comments</p>
            )
          ) : (
            <Spinner animation="border" variant="dark" />
          )}
          {}
        </Container>
      )}
      <hr></hr>
    </Card>
  );
}

export default Post;
