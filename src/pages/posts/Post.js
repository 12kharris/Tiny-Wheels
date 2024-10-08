import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
    Tag,
    TagColour,
    TagName,
    Title,
    Updated_at,
    id,
    is_owner,
  } = props;

  const currentUser = useCurrentUser();

  return (
    <Link key={id} to="#">
      <p>{Title}</p>
      <p>{Caption}</p>
      <p>{TagName}</p>
      <img src={Image} />
      {/* Add like/dislike button here */}
      <p>
        Likes: {Likes_count} Dislikes: {Dislikes_count}
      </p>
      <p>{LikeType === "Liked" ? "Like" : "Dislike"}</p>
      {/* Add comment count here */}
      <hr></hr>
    </Link>
  );
}

export default Post;
