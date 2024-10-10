import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import Post from "../posts/Post";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export function Profile(props) {
  const {
    //id,
    User,
    OwnerUsername,
    Created_at,
    ProfileImage,
    Name,
    is_owner,
    is_followed,
  } = props;

  const {id} = useParams();
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [followed, setFollowed] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchPosts();
    fetchFollowed();
  }, [currentUser, id, history, OwnerUsername]);

  const fetchPosts = async () => {
    try {
      if (OwnerUsername) {
        const { data } = await axiosReq.get(
          `/posts/?Profile__User__username=${OwnerUsername}&Profile__FollowedProfile__FollowingProfile=`
        );
        setPosts(data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFollowed = async () => {
    try {
      if (currentUser) {
        const { data } = await axiosReq.get(
          `/followers/?FollowingProfile__User=${currentUser.pk}&FollowedProfile__id=${id}`
        );
        setFollowed(data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
        await axiosRes.post("/followers/", {
            FollowingProfile: currentUser.profile_id,
            FollowedProfile: id
        }).then(() => {
            fetchFollowed();
        })
    } catch (err) {
        console.log(err);
    }
  };

  const handleUnFollow = async() => {
    try {
        await axiosRes.delete(`/followers/${followed[0].id}`).then(() => {
            fetchFollowed();
        })
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>
      {is_owner && <p>Edit here</p>}
      <p>{OwnerUsername}</p>
      <p>{Name}</p>
      <Image src={ProfileImage} />
      {currentUser ? followed.length > 0 ? (
        <Button variant="danger" onClick={handleUnFollow}>Unfollow</Button>
        ) : is_owner ? (<></>) : (
        <Button variant="primary" onClick={handleFollow}>Follow</Button>
        ) : (<></>)}
      <p>Joined: {Created_at}</p>

      <div>
        <p>{OwnerUsername}'s posts</p>
        <hr></hr>
        {posts?.length > 0 ? (
          posts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
