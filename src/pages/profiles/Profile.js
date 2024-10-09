import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../posts/Post";

export function Profile(props) {
  const { 
    id, 
    User, 
    OwnerUsername, 
    Created_at,
    ProfileImage,
    Name,
    is_owner } = props;

    const [posts, setPosts] = useState([]);

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
        fetchPosts();
    }, [])

  return (
    <div>
      <p>{OwnerUsername}</p>
      <p>{Name}</p>
      <Image src={ProfileImage} />
      <p>Joined: {Created_at}</p>

      <div>
        <p>{OwnerUsername}'s posts</p>
        <hr></hr>
        {posts?.length > 0 ? (
            posts.map(post => (
                //make this a Post component
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
