import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import ProfilePreview from "../profiles/ProfilePreview";
import {
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
        setComments(data.results);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = () => {};

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
    }
  };

  return (
    <Card key={id} className={styles.post}>
      <Card.Header>
        <Media>
          <Link to={`profiles/${OwnerProfileID}`}>
            <ProfilePreview
              imageURL={OwnerProfileImage}
              text={OwnerProfile?.Length > 0 ? OwnerProfile : OwnerUsername}
            />
          </Link>
          <div>
            {is_owner && (
              <OptionsDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Header>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Caption}</Card.Text>
        <div className={styles.img_holder}>
          <Link to={`/posts/${id}`}>
            <Card.Img src={Image} className={styles.img}></Card.Img>
          </Link>
        </div>
      </Card.Body>

      <p>{TagName}</p>

      <Card.Footer>
        <Row>
          {LikeDislike_id && LikeType == "like" ? (
            <Col>
              {Likes_count}
              {"   "}
              <span onClick={handleUnLike}>
                <i className="fa-solid fa-thumbs-up"></i>
              </span>
              {Dislikes_count}
              {"    "}
              <i className="fa-regular fa-thumbs-down"></i>
            </Col>
          ) : LikeDislike_id && LikeType == "dislike" ? (
            <Col>
              {Likes_count}
              {"   "}
              <i className="fa-regular fa-thumbs-up"></i>
              {Dislikes_count}
              {"    "}
              <span onClick={handleUnDislike}>
                <i className="fa-solid fa-thumbs-down"></i>
              </span>
            </Col>
          ) : is_owner ? (
            <Col>
              {Likes_count}
              {"   "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up"></i>
              </OverlayTrigger>
              {Dislikes_count}
              {"    "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't dislike your own post</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-down"></i>
              </OverlayTrigger>
            </Col>
          ) : currentUser ? (
            <Col>
              {Likes_count}
              {"   "}
              <span onClick={handleLike}>
                <i className="fa-regular fa-thumbs-up"></i>
              </span>
              {Dislikes_count}
              {"    "}
              <span onClick={handleDislike}>
                <i className="fa-regular fa-thumbs-down"></i>
              </span>
            </Col>
          ) : (
            <Col>
              {Likes_count}
              {"   "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like a post</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up"></i>
              </OverlayTrigger>
              {Dislikes_count}
              {"    "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to dislike a post</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-down"></i>
              </OverlayTrigger>
            </Col>
          )}
          <Col>
            <Link to={`/posts/${id}`}>
              <i className="fa-regular fa-comment"></i> {Comments_count}
            </Link>
            {currentUser?.pk && !addComment && showComments && (
              <Button
                onClick={() => {
                  setAddComment(!addComment);
                }}
              >
                Add comment
              </Button>
            )}
          </Col>
        </Row>
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
              <Col>
                <Form.Control
                  type="text"
                  value={commentFormData.Content}
                  name="Content"
                  placeholder="Type a comment..."
                  onChange={handleCommentChange}
                ></Form.Control>
              </Col>
              <Col>
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
            comments.map((c) => <Comment key={c.id} {...c} getComments={getComments}/>)
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
