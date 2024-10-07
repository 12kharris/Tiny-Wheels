import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosRes } from '../../api/axiosDefaults';
import Post from './Post';

const PostsPage = () => {

    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const {data} = await axiosRes.get("/posts/");
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

export default PostsPage