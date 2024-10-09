import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../posts/Post";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export function Profile(props) {
  const { 
    id, 
    User, 
    OwnerUsername, 
    Created_at,
    ProfileImage,
    Name,
    is_owner,
    is_followed
 } = props;

    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState([]);
    const [followed, setFollowed] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const {data} = await axiosReq.get(`/posts/?Profile__User__username=${OwnerUsername}&Profile__FollowedProfile__FollowingProfile=`);
                console.log(data);
                setPosts(data.results);
            }
            catch (err) {
                console.log(err);
            }
        }
        const fetchFollowed = async() => {
            try {
                console.log(currentUser);
                const {data} = await axiosReq.get(`/followers/?FollowingProfile__User=1&FollowedProfile__id=2`);
                setFollowed(data.results);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchPosts();
        fetchFollowed();
    }, [])

    ///followers/?FollowingProfile__User=1&FollowedProfile__id=2

  return (
    <div>
        {is_owner && <p>Edit here</p>}
      <p>{OwnerUsername}</p>
      <p>{Name}</p>
      <Image src={ProfileImage} />
      {followed?.length > 0 ? (
        followed.map(f => (<Button key={f.id} variant="danger">Unfollow</Button>) )) : (
        <Button variant="primary">Follow</Button>
      )
    }
      <p>Joined: {Created_at}</p>

      <div>
        <p>{OwnerUsername}'s posts</p>
        <hr></hr>
        {posts?.length > 0 ? (
            posts.map(post => (
                <Post key={post.id} {...post} />
            ))
        ) : (
            <p>No Results</p>
        )}
    </div>
    </div>
  );
}

export default Profile;
