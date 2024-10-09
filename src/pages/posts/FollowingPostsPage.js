import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosRes } from '../../api/axiosDefaults';
import Post from './Post';

const FollowingPostsPage = () => {

    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getFollowedPosts = async() => {
            try {
                if (currentUser) {
                    console.log(`current user: ${currentUser.profile_id}`)
                    const {data} = await axiosRes.get(`/posts/?Profile__FollowedProfile__FollowingProfile=${currentUser?.profile_id}`);
                    console.log(data);
                    setPosts(data?.results);
                }       
            }
            catch (err) {
                console.log(err);
            }
        }
        getFollowedPosts();
    }, [currentUser])

  return (
    <div>
        {posts?.length > 0 ? (
            posts.map(post => (
                //make this a Post component
                <Post key={post.id} {...post} />
            ))
        ) : (
            <p>No Results</p>
        )}
    </div>
  )
}

export default FollowingPostsPage