import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PostDropdown } from "../../components/PostDropdown";
import ProfilePreview from "../profiles/ProfilePreview";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";

function Post(props) {
  const {
    Caption,
    Created_at,
    Dislikes_count,
    Image,
    LikeDislike_id,
    LikeType,
    Likes_count,
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
      setPosts((prevPosts) => (
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
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnLike = async () => {
    try {
      await axiosRes.delete(`/likes/${LikeDislike_id}`);
        setPosts((prevPosts) => (
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
        ));
      
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
      setPosts((prevPosts) => (
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
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnDislike = async () => {
    try {
      await axiosRes.delete(`/likes/${LikeDislike_id}`).then(() => {
        setPosts((prevPosts) => (
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
        ));
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={id}>
      <Link to={`profiles/${OwnerProfileID}`}>
        <ProfilePreview
          imageURL={OwnerProfileImage}
          text={OwnerProfile?.Length > 0 ? OwnerProfile : OwnerUsername}
        />
      </Link>
      <div>
        <span>
          {Title}{" "}
          {is_owner && (
            <PostDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </span>
      </div>
      <p>{Caption}</p>
      <p>{TagName}</p>
      <Link to={`/posts/${id}`}>
        <img src={Image} />
      </Link>
      {/* Add like/dislike button here */}
      <p>
        {Likes_count}{" "}
        {LikeDislike_id && LikeType == "like" ? (
          <span onClick={handleUnLike}>
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
        ) : is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't like your own post</Tooltip>}
          >
            <i className="fa-regular fa-thumbs-up"></i>
          </OverlayTrigger>
        ) : (
          <span onClick={handleLike}>
            <i className="fa-regular fa-thumbs-up"></i>
          </span>
        )}{" "}
        {Dislikes_count}
        {"    "}
        {LikeDislike_id && LikeType == "dislike" ? (
          <span onClick={handleUnDislike}>
            <i className="fa-solid fa-thumbs-down"></i>
          </span>
        ) : is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't dislike your own post</Tooltip>}
          >
            <i className="fa-regular fa-thumbs-down"></i>
          </OverlayTrigger>
        ) : (
          <span onClick={handleDislike}>
            <i className="fa-regular fa-thumbs-down"></i>
          </span>
        )}
      </p>
      {/* Add comment count here */}
      <hr></hr>
    </div>
  );
}

export default Post;
