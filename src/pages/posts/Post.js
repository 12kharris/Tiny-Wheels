import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OptionsDropdown } from "../../components/OptionsDropdown";
import ProfilePreview from "../profiles/ProfilePreview";
import {
  Button,
  Card,
  Col,
  Media,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Post.module.css";

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
  } = props;

  const currentUser = useCurrentUser();
  const history = useHistory();

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
              <i class="fa-regular fa-comment"></i> {Comments_count}
            </Link>
          </Col>
        </Row>
      </Card.Footer>

      {/* Add comment count here */}
      <hr></hr>
    </Card>
  );
}

export default Post;
