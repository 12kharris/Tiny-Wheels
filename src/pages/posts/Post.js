import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PostDropdown } from "../../components/PostDropdown";

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
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  }

  const handleDelete = () => {}

  return (
    <div key={id} >
      <span>{Title} {is_owner && <PostDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}</span>
      <p>{Caption}</p>
      <p>{TagName}</p>
      <Link to={`/posts/${id}`}>
        <img src={Image} />
      </Link>
      {/* Add like/dislike button here */}
      <p>
        Likes: {Likes_count} Dislikes: {Dislikes_count}
      </p>
      <p>{LikeType === "Liked" ? "Like" : "Dislike"}</p>
      {/* Add comment count here */}
      <hr></hr>
    </div>
  );
}

export default Post;
