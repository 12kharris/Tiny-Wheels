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
  Media,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";
import Comment from "../comments/Comment";

function Post(props) {
  const {
    Caption,
    Created_at,
    Dislikes_count,
    Image,
    LikeDislike_id,
    LikeType,
    Likes_count,
    Comments_count,
    OwnerProfile,
    OwnerProfileID,
    OwnerProfileImage,
    OwnerUsername,
    Tag,
    TagColour,
    TagName,
    Title,
    Updated_at,
    id,
    is_owner,
    setPosts,
    showComments,
  } = props;

  const currentUser = useCurrentUser();
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    Post: null,
    Content: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      getComments();
      setCommentFormData({
        Post: id,
        Content: "",
      });
    }
  }, [id]);

  const getComments = async () => {
    if (id) {
      try {
        const { data } = await axiosRes.get(`/comments/?Post=${id}`);
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}`);
      history.push(`/profiles/${currentUser?.profile_id}`);
    } catch (err) {
      console.log(err.response?.data);
    }
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
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnDislike = async () => {
    try {
      await axiosRes.delete(`/likes/${LikeDislike_id}`).then(() => {
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
      });
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <Card key={id} className={styles.post}>
      <Card.Header>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <Link to={`profiles/${OwnerProfileID}`}>
              <ProfilePreview
                imageURL={OwnerProfileImage}
                text={OwnerProfile?.Length > 0 ? OwnerProfile : OwnerUsername}
                height={50}
              />
            </Link>
          </Col>
          <Col xs={1}>
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
          <Link to={`/posts/${id}`}>
            <Card.Img src={Image} className={styles.img}></Card.Img>
          </Link>
        </div>
      </Card.Body>

      <p>{TagName}</p>

      <Card.Footer>
        <div className={styles.footer}>
          <Row>
            {LikeDislike_id && LikeType == "like" ? (
              <Col>
                <Row>
                  <Col xs={3}>
                    <span onClick={handleUnLike} className={styles.liked}>
                      {Likes_count} <i className="fa-solid fa-thumbs-up"></i>
                    </span>
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <span className={styles.thumbsdown}>
                      {Dislikes_count}{" "}
                      <i className="fa-regular fa-thumbs-down"></i>
                    </span>
                  </Col>
                </Row>
              </Col>
            ) : LikeDislike_id && LikeType == "dislike" ? (
              <Col>
                <Row>
                  <Col xs={3}>
                    <span className={styles.thumbsup}>
                      {Likes_count}
                      <i className="fa-regular fa-thumbs-up"></i>
                    </span>
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <span onClick={handleUnDislike} className={styles.disliked}>
                      {Dislikes_count}{" "}
                      <i className="fa-solid fa-thumbs-down"></i>
                    </span>
                  </Col>
                </Row>
              </Col>
            ) : is_owner ? (
              <Col>
                <Row>
                  <Col xs={3}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>You can't like your own post</Tooltip>}
                    >
                      <span className={styles.thumbsup}>
                        {Likes_count}
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
                        {Dislikes_count}
                        <i className="fa-regular fa-thumbs-down"></i>
                      </span>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Col>
            ) : currentUser ? (
              <Col>
                <Row>
                  <Col xs={3}>
                    <span onClick={handleLike} className={styles.thumbsup}>
                      {Likes_count}
                      <i className="fa-regular fa-thumbs-up"></i>
                    </span>
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <span onClick={handleDislike} className={styles.thumbsdown}>
                      {Dislikes_count}
                      <i className="fa-regular fa-thumbs-down"></i>
                    </span>
                  </Col>
                </Row>
              </Col>
            ) : (
              <Col>
                <Row>
                  <Col xs={3}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to like a post</Tooltip>}
                    >
                      <span className={styles.thumbsup}>
                        {Likes_count}{" "}
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
                        {Dislikes_count}{" "}
                        <i className="fa-regular fa-thumbs-down"></i>
                      </span>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Col>
            )}
            <Col>
              <Link to={`/posts/${id}`}>
                <i className="fa-regular fa-comment"></i> {Comments_count}
              </Link>

              {currentUser?.pk && !addComment && showComments && (
                <span style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => {
                      setAddComment(!addComment);
                    }}
                  >
                    Add comment
                  </Button>
                </span>
              )}
            </Col>
          </Row>
        </div>
      </Card.Footer>
      {addComment && (
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
              <Col xs={8} style={{ paddingRight: "0px" }}>
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
              <Col xs={1} style={{ paddingLeft: "0px" }}>
                <Button variant="success" type="submit">
                  Add
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => {
                    setAddComment(false);
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      )}
      {showComments && (
        <Container>
          {comments.length > 0 ? (
            comments.map((c) => (
              <Comment key={c.id} {...c} getComments={getComments} />
            ))
          ) : (
            <p>No Comments</p>
          )}
        </Container>
      )}
      <hr></hr>
    </Card>
  );
}

export default Post;
